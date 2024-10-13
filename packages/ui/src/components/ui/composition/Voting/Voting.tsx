import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../card"
import { Badge } from "../../badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar"

type Person = {
  id: string
  name: string
  role: string
  description: string
  quote: string
  impact: string
  categories: string[]
  imageUrl: string
  website: string
}

const people: Person[] = [
  {
    id: "1",
    name: "Ana Silva",
    role: "Cientista de Dados",
    description: "Especialista em inteligência artificial e aprendizado de máquina",
    quote: "Dados são o novo petróleo da era digital",
    impact: "Desenvolveu algoritmos que melhoraram a eficiência energética em 30%",
    categories: ["IA", "Sustentabilidade"],
    imageUrl: "https://esitlikadaletkadin.org/depo/2023/01/sonia.jpeg",
    website: "anasilva.tech"
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    role: "Empreendedor Social",
    description: "Fundador de várias startups focadas em educação acessível",
    quote: "A educação é a arma mais poderosa para mudar o mundo",
    impact: "Suas iniciativas já beneficiaram mais de 1 milhão de estudantes",
    categories: ["Educação", "Impacto Social"],
    imageUrl: "https://esitlikadaletkadin.org/depo/2023/01/sonia.jpeg",
    website: "carlosoliveira.org"
  },
  {
    id: "3",
    name: "Mariana Santos",
    role: "Pesquisadora em Saúde",
    description: "Líder em pesquisas sobre tratamentos inovadores para doenças raras",
    quote: "A cura está na persistência e na colaboração",
    impact: "Suas descobertas abriram caminho para novos tratamentos promissores",
    categories: ["Saúde", "Inovação"],
    imageUrl: "https://esitlikadaletkadin.org/depo/2023/01/sonia.jpeg",
    website: "marianasantos.med"
  },
  {
    id: "4",
    name: "Roberto Ferreira",
    role: "Arquiteto Sustentável",
    description: "Pioneiro em projetos de construção ecológica e eficiente",
    quote: "Construir em harmonia com a natureza é o futuro da arquitetura",
    impact: "Seus projetos reduziram o consumo de energia em edifícios em até 50%",
    categories: ["Arquitetura", "Sustentabilidade"],
    imageUrl: "https://esitlikadaletkadin.org/depo/2023/01/sonia.jpeg",
    website: "https://esitlikadaletkadin.org/depo/2023/01/sonia.jpeg"
  },
  {
    id: "5",
    name: "Luísa Mendes",
    role: "Ativista Ambiental",
    description: "Defensora incansável da preservação da Amazônia",
    quote: "Proteger a natureza é proteger nosso futuro",
    impact: "Liderou campanhas que preservaram mais de 100.000 hectares de floresta",
    categories: ["Meio Ambiente", "Ativismo"],
    imageUrl: "https://esitlikadaletkadin.org/depo/2023/01/sonia.jpeg",
    website: "luisamendes.org"
  },
]

export function Voting() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Pessoas Notáveis</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3"> {/* Update 1 */}
        {people.slice(0, 3).map((person, index) => (
          <Card key={person.id} className="overflow-hidden border-gray-200 shadow-lg backdrop-blur-sm bg-white/30">
            <CardHeader className="relative p-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10"></div>
              <img
                src={person.imageUrl}
                alt=""
                className="w-full h-48 object-cover"
              />
              <div
                className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center text-4xl font-bold"
                style={{
                  backgroundImage: `url("/placeholder.svg?height=64&width=64&text=${index + 1}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <span className="text-yellow-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{index + 1}</span> {/* Update 2 */}
              </div>
              <Avatar className="w-24 h-24 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-background z-20">
                {/* <AvatarImage src={person.imageUrl} alt={person.name} /> */}
                {/* <AvatarFallback> */}
                <span className="text-yellow-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{index + 1}</span>
                {/* </AvatarFallback> */}
              </Avatar>
            </CardHeader>
            <CardContent className="pt-16 text-center">
              <CardTitle className="mb-2">{person.name}</CardTitle>
              <p className="text-sm text-muted-foreground mb-2">{person.role}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {person.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              <p className="text-sm mb-2">{person.description}</p>
              <p className="text-sm italic mb-2">"{person.quote}"</p>
              <p className="text-sm text-muted-foreground mb-2">
                Impacto: {person.impact}
              </p>
              <a
                href={`https://${person.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline mt-2 inline-block"
              >
                {person.website}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {people.slice(3).map((person) => (
          <Card key={person.id} className="flex items-center p-4 space-x-4 border-gray-200 backdrop-blur-sm bg-white/30">
            <Avatar className="w-16 h-16">
              <AvatarImage src={person.imageUrl} alt={person.name} />
              <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate">{person.name}</CardTitle>
              <p className="text-sm text-muted-foreground truncate">{person.role}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {person.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}