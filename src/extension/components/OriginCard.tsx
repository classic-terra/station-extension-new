import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./OriginCard.module.scss"

interface Props {
  hostname: string
}

interface ManifestResult {
  title?: string
  faviconUrl?: string
}

async function getIconAndTitle(hostname: string): Promise<ManifestResult> {
  try {
    const { data: manifest } = await axios.get(
      `https://${hostname}/manifest.json`
    )

    const title = manifest.name ?? manifest.short_name
    let faviconUrl

    // Find an appropriate icon from the manifest
    if (manifest.icons && manifest.icons.length > 0) {
      const icon = manifest.icons[0] // Select the first icon as a fallback
      faviconUrl = icon.src

      // If the URL is relative, make it absolute
      if (!faviconUrl.startsWith("http")) {
        const baseUrl = new URL(`https://${hostname}`)
        faviconUrl = new URL(faviconUrl, baseUrl).href
      }
    }

    return {
      title,
      faviconUrl,
    }
  } catch (e) {
    return {
      title: undefined,
      faviconUrl: undefined,
    }
  }
}

const OriginCard = ({ hostname }: Props) => {
  const [metadata, setMetadata] = useState<ManifestResult>({})

  useEffect(() => {
    ;(async () => {
      const res = await getIconAndTitle(hostname)
      setMetadata(res)
    })()
  }, [hostname])

  return (
    <div className={styles.origin}>
      {metadata.faviconUrl && (
        <img
          src={metadata.faviconUrl}
          alt={metadata.title ?? hostname}
          className={styles.icon}
        />
      )}
      <div className={styles.details}>
        <h2>{metadata.title ?? hostname}</h2>
        <p>{hostname}</p>
      </div>
    </div>
  )
}

export default OriginCard
