import axios from "axios"
import { ASSETS, STATION_ASSETS, STATION_CHAIN } from "config/constants"
import { WhitelistProvider, WhitelistData } from "data/queries/chains"
import { PropsWithChildren, useEffect, useState } from "react"

const InitChains = ({ children }: PropsWithChildren<{}>) => {
  const [whitelist, setWhitelist] = useState<WhitelistData["whitelist"]>()
  const [ibcDenoms, setIbcDenoms] = useState<WhitelistData["ibcDenoms"]>()
  const [legacyWhitelist, setLegacyWhitelist] =
    useState<WhitelistData["legacyWhitelist"]>()

  useEffect(() => {
    axios
      .get("/coins.json", { baseURL: STATION_CHAIN })
      .then(({ data }) => setWhitelist(data))
    axios
      .get("/ibc_denoms.json", { baseURL: STATION_ASSETS })
      .then(({ data }) => setIbcDenoms(data))
    axios
      .get("/stationcoins.json", { baseURL: STATION_CHAIN })
      .then(({ data }) => setLegacyWhitelist(data))
  }, [])

  if (!(whitelist && ibcDenoms && legacyWhitelist)) return null
  return (
    <WhitelistProvider value={{ whitelist, ibcDenoms, legacyWhitelist }}>
      {children}
    </WhitelistProvider>
  )
}

export default InitChains
