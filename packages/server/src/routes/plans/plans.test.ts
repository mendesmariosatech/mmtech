import {
	afterAll,
	describe,
	expect,
	test,
	jest,
	beforeAll,
	beforeEach,
} from "@jest/globals";
import { testClient } from "hono/testing";
import { plansRouter } from ".";
import { PlansTestSetup } from "../tests/plans-setup";

// Mock token verification
jest.mock("../../jwt_token", () => {
	return {
		generateToken: jest.fn().mockReturnValue(Promise.resolve("test-token")),
		decodeToken: jest.fn().mockReturnValue(
			Promise.resolve({
				authId: "AU_test123",
				clientId: "CL_test123",
				businessId: "BU_test123",
			}),
		),
	};
});

const SECONDS = 1000;
jest.setTimeout(30 * SECONDS);

describe("Plans API Tests", () => {
	// Clean up test data before tests
	beforeAll(async () => {
		await PlansTestSetup.cleanupPlansData();
	});

	// Clean up test data after tests
	afterAll(async () => {
		await PlansTestSetup.cleanupPlansData();
	});

	// Create a clean state before each test
	beforeEach(async () => {
		await PlansTestSetup.cleanupPlansData();
	});

	describe("Create Master Plan - POST /master-plan", () => {
		test("User can create a master plan", async () => {
			const client = testClient(plansRouter);

			const response = await client["master-plan"].post({
				json: {
					name: "Test Master Plan",
					description: "Description for test master plan",
				},
			});

			expect(response.status).toBe(200);

			const responseData = await response.json();
			expect(responseData.data).toBeDefined();
			expect(responseData.data.name).toBe("Test Master Plan");
			expect(responseData.data.description).toBe(
				"Description for test master plan",
			);
			expect(responseData.data.planMasterId).toBeDefined();

			// Save the plan ID for the next test
			return responseData.data.planMasterId;
		});
	});

	describe("Get Master Plans - GET /master-plans", () => {
		test("User can get a list of all master plans", async () => {
			// First create a master plan
			const createClient = testClient(plansRouter);
			const createResponse = await createClient["master-plan"].post({
				json: {
					name: "Test Master Plan List",
					description: "Description for test master plan list",
				},
			});
			expect(createResponse.status).toBe(200);

			// Now get the list of master plans
			const client = testClient(plansRouter);
			const response = await client["master-plans"].get();

			expect(response.status).toBe(200);

			const responseData = await response.json();
			expect(responseData.data).toBeDefined();
			expect(Array.isArray(responseData.data)).toBe(true);
			expect(responseData.data.length).toBeGreaterThan(0);

			// Check if our created plan is in the list
			const createdPlan = responseData.data.find(
				(plan: any) => plan.name === "Test Master Plan List",
			);
			expect(createdPlan).toBeDefined();
			expect(createdPlan.description).toBe(
				"Description for test master plan list",
			);
		});
	});

	describe("Get Master Plan Details - GET /master-plan/:id", () => {
		test("User can get details of a specific master plan with its tasks", async () => {
			// First create a master plan
			const createClient = testClient(plansRouter);
			const createResponse = await createClient["master-plan"].post({
				json: {
					name: "Test Master Plan Details",
					description: "Description for test master plan details",
				},
			});
			expect(createResponse.status).toBe(200);

			const createData = await createResponse.json();
			const planId = createData.data.planMasterId;

			// Now get the details of the master plan
			const client = testClient(plansRouter);
			const response = await client["master-plan"][":id"].get({
				param: { id: planId },
			});

			expect(response.status).toBe(200);

			const responseData = await response.json();
			expect(responseData.data).toBeDefined();
			expect(responseData.data.planMasterId).toBe(planId);
			expect(responseData.data.name).toBe("Test Master Plan Details");
			expect(responseData.data.description).toBe(
				"Description for test master plan details",
			);
			expect(responseData.data.tasks).toBeDefined();
			expect(Array.isArray(responseData.data.tasks)).toBe(true);
		});

		test("Returns 404 when requesting a non-existent master plan", async () => {
			const client = testClient(plansRouter);
			const response = await client["master-plan"][":id"].get({
				param: { id: "PM_nonexistent" },
			});

			expect(response.status).toBe(404);

			const responseData = await response.json();
			expect(responseData.error).toBeDefined();
			expect(responseData.error.message).toBe("Plano mestre não encontrado");
		});
	});
});
