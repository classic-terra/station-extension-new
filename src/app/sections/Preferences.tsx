import { useTranslation } from "react-i18next"
import LanguageIcon from "@mui/icons-material/Language"
import { Tabs } from "components/layout"
import { Popover } from "components/display"
import PopoverNone from "../components/PopoverNone"
import HeaderIconButton from "../components/HeaderIconButton"
import NetworkSetting from "./NetworkSetting"
import LanguageSetting from "./LanguageSetting"
import CurrencySetting from "./CurrencySetting"

const Preferences = () => {
  const { t } = useTranslation()

  const tabs = [
    { key: "network", tab: t("Network"), children: <NetworkSetting /> },
    { key: "lang", tab: t("Language"), children: <LanguageSetting /> },
    { key: "currency", tab: t("Currency"), children: <CurrencySetting /> },
  ].filter(({ children }) => children)

  return (
    <Popover
      content={
        <PopoverNone>
          <Tabs tabs={tabs} type="line" state />
        </PopoverNone>
      }
      placement="bottom"
      theme="none"
    >
      <HeaderIconButton>
        <LanguageIcon style={{ fontSize: 18 }} />
      </HeaderIconButton>
    </Popover>
  )
}

export default Preferences
