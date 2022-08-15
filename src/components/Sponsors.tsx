import storyblok from "~/images/storyblok.png"
import browserku from "~/images/browserku.png"

const sponsors = [
  {
    title:
      "Browserku: REST API for web scraping, screenshots, PDF generation and more",
    image: browserku,
    url: `https://browserku.com`,
  },
  {
    title:
      "Storyblok: Build projects faster with the most flexible headless CMS out there",
    image: storyblok,
    url: `https://www.storyblok.com/developers?utm_source=egoist&utm_medium=github&utm_campaign=sponsorship`,
  },
].sort((a, b) => (a.title > b.title ? 1 : -1))

export const Sponsors = () => {
  return (
    <div className="p-4 mt-5">
      <h3 className="text-gray-400 mb-2 text-xs uppercase font-medium">
        <a
          href="https://github.com/sponsors/egoist"
          target="_blank"
          rel="nofollow noopener"
          className="hover:text-indigo-500"
        >
          GitHub Sponsors
        </a>
      </h3>
      <div className="grid sm:grid-cols-2 gap-1">
        {sponsors.map(({ title, url, image }) => {
          return (
            <a
              key={title}
              title={title}
              target="_blank"
              rel="nofollow noopener"
              className="bg-zinc-200 hover:bg-zinc-300 transition-colors rounded p-3 flex items-center justify-center"
              href={url}
            >
              <img src={image.src} width={image.width} height={image.height} />
            </a>
          )
        })}
      </div>
    </div>
  )
}
