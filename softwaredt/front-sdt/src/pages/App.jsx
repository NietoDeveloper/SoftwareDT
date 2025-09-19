import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Section from "../components/Section"

const App = () => {

  const datas = [
    {
      "id" : 1,
      "asset" : "1.jpg",
      "headerStatus" : "UPCOMING LAUNCH",
      "headerTitle" : "AX-3 MISSION",
      "btnTarget" : "https://www.spacex.com/launches/mission/?missionId:ax-3",
      "btnText" : "WATCH"
    },
    {
      "id" : 2,
      "asset" : "2.jpg",
      "headerStatus" : "RECENT LAUNCH",
      "headerTitle" : "STARLINK MISSION",
      "btnTarget" : "https://www.spacex.com/launches/mission/?missionId=sl-6-37",
      "btnText" : "REWATCH"
    },
    {
      "id" : 3,
      "asset" : "3.jpg",
      "headerStatus" : "RECENT LAUNCH",
      "headerTitle" : "STARLINK MISSION",
      "btnTarget" : "https://www.spacex.com/launches/mission/?missionId=sl-7-10",
      "btnText" : "REWATCH"
    },
    {
      "id" : 4,
      "asset" : "4.mp4",
      "headerStatus" : "RECENT LAUNCH",
      "headerTitle" : "STARSHIP'S SECOND FLIGHT TEST",
      "btnTarget" : "https://www.spacex.com/launches/mission/?missionId=starship-flight-2",
      "btnText" : "LEARN MORE"
    }
  ]

  return (
    <>
      <Navbar />

      {
        datas && datas.map((data) => {
          return (
            <Section 
              key={data.id}
              asset={data.asset}
              headerStatus={data.headerStatus}
              headerTitle={data.headerTitle}
              btnTarget={data.btnTarget}
              btnText={data.btnText}
            />
          )
        })
      }

      <Footer />
    </>
  )
}

export default App