import { Header } from "@repo/ui/components/domain/Personal/Header"
import { hono_client } from "../src/hono-client"

const Dashboard = async () => {


  try {
    // const URL = hono_client.api.$url()
    // console.log(
    //   { URL }
    // )
    // const resp = await fetch(hono_client.api.personal.me.$url())
    // const data = await resp.json()

    // const resp = await hono_client.api.personal.me.$get({
    //   query: {
    //     email: '10',
    //     password: '2023-01-01',
    //   }
    // })

    // if (resp.status !== 201) {
    //   return <div>Error</div>
    // }
    // const { data } = await resp.json()
    // console.log({ data })

    console.log({
      URL: hono_client.api.$url()
    })

    return <Header name={`Text:`} email={JSON.stringify(URL)} />
  } catch (error) {
    console.log({ error })
    return <div>Error</div>
  }

}

export default Dashboard