"use client";

import { Invoice } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Printer } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface InvoiceListProps {
	invoices: Invoice[];
	companyId: string;
}

const statusColors: Record<string, string> = {
	draft: "bg-gray-100 text-gray-800",
	sent: "bg-blue-100 text-blue-800",
	paid: "bg-green-100 text-green-800",
};

export function InvoiceList({ invoices, companyId }: InvoiceListProps) {
	const router = useRouter();

	const updateStatus = async (invoiceId: string, status: string) => {
		const supabase = createClient();
		await supabase.from("invoices").update({ status }).eq("id", invoiceId);
		router.refresh();
	};

	const printInvoice = (invoice: Invoice) => {
		const printWindow = window.open("", "_blank");
		if (!printWindow) return;

		printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${invoice.invoice_number}</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { margin: 0; color: #333; }
            .info { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .info-block { }
            .info-block h3 { margin: 0 0 10px 0; color: #666; font-size: 12px; text-transform: uppercase; }
            .info-block p { margin: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background: #f5f5f5; }
            .total { font-size: 24px; text-align: right; margin-top: 30px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>INVOICE</h1>
            <p>#${invoice.invoice_number}</p>
          </div>
          <div class="info">
            <div class="info-block">
              <h3>Bill To</h3>
              <p><strong>${invoice.client?.name}</strong></p>
              <p>${invoice.client?.email || ""}</p>
            </div>
            <div class="info-block">
              <h3>Invoice Details</h3>
              <p>Period: ${new Date(invoice.period_start).toLocaleDateString()} - ${new Date(invoice.period_end).toLocaleDateString()}</p>
              <p>Status: ${invoice.status.toUpperCase()}</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dog Walking Services</td>
                <td>${invoice.total_walks} walks</td>
                <td>$${invoice.total_amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div class="total">
            <strong>Total: $${invoice.total_amount.toFixed(2)}</strong>
          </div>
          <div class="footer">
            <p>Thank you for your business!</p>
          </div>
        </body>
      </html>
    `);
		printWindow.document.close();
		printWindow.print();
	};

	if (invoices.length === 0) {
		return (
			<Card>
				<CardContent className="flex flex-col items-center justify-center py-12">
					<p className="text-muted-foreground">No invoices yet</p>
					<p className="text-sm text-muted-foreground">
						Generate invoices for completed walks
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardContent className="p-0">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Invoice #</TableHead>
							<TableHead>Client</TableHead>
							<TableHead>Period</TableHead>
							<TableHead>Walks</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoices.map((invoice) => (
							<TableRow key={invoice.id}>
								<TableCell className="font-medium">
									{invoice.invoice_number}
								</TableCell>
								<TableCell>{invoice.client?.name}</TableCell>
								<TableCell>
									{new Date(invoice.period_start).toLocaleDateString()} -{" "}
									{new Date(invoice.period_end).toLocaleDateString()}
								</TableCell>
								<TableCell>{invoice.total_walks}</TableCell>
								<TableCell className="font-medium">
									${invoice.total_amount.toFixed(2)}
								</TableCell>
								<TableCell>
									<Badge
										className={statusColors[invoice.status]}
										variant="outline"
									>
										{invoice.status}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<Button
											variant="ghost"
											size="icon"
											onClick={() => printInvoice(invoice)}
										>
											<Printer className="h-4 w-4" />
										</Button>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onClick={() => updateStatus(invoice.id, "sent")}
												>
													Mark as Sent
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => updateStatus(invoice.id, "paid")}
												>
													Mark as Paid
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
