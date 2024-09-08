import { Header } from "@repo/ui/components/domain/Personal/Header"
import { hono_client } from "../hono-client"

const Dashboard = async () => {

  try {
    console.log(
      { URL: hono_client.api.$url() }
    )
    const resp = await hono_client.api.personal.me.$get({
      query: {
        email: '10',
        password: '2023-01-01',
      }
    })

    if (resp.status !== 201) {
      return <div>Error</div>
    }
    const { data } = await resp.json()
    console.log({ data })

    return <Header name={`Text: ${data.email}`} email="test@example.com" />
  } catch (error) {
    console.log({ error })
    return <div>Error</div>
  }

}

export default Dashboard