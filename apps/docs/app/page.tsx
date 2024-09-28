import { Header } from "@repo/ui/components/domain/Personal/Header"
import { hono_client } from "../src/hono-client"
import { cookies } from 'next/headers'

const Dashboard = async () => {


  try {
    const URL = hono_client.api.$url()
    const cookieStore = cookies()
    const USER_TOKEN = cookieStore.get('USER_TOKEN')

    // get from cookie

    const resp = await hono_client.api.personal.me.$get({
      query: {
        email: '10',
        password: '2023-01-01',
      },
      header: {
        Authorization: `Bearer ${USER_TOKEN?.value}` || '',
      }
    })

    // if (resp.status !== 201 && resp.status == 401) {
    //   const response = await resp.json()
    //   return <div>Error: {response.error}</div>
    // }
    // if (resp.status == 404) {
    //   const response = await resp.json()
    //   return <div>Error: {response.error.message}</div>
    // }


    // const { data } = await resp.json()
    // console.log({ data })

    return <Header name={`Text:`} email={JSON.stringify(URL)} />
  } catch (error) {
    console.log({ error })
    return <div>Error</div>
  }

}

export default Dashboard