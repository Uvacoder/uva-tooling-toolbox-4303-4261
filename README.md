# Dev Tools at tooling.one

https://github.com/egoist/tooling.one

https://tooling.one

<Sponsors />
        <div className="p-4 mt-5">
          <ul className="text-xs">
            {footLinks.map((link) => {
              return (
                <li className="text-zinc-400" key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="nofollow noopener"
                    className="hover:text-indigo-500 flex items-center space-x-1"
                  >
                    {link.icon}
                    <span>{link.text}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        
-----

<div className="bg-cyan-100 text-cyan-700 font-bold p-5 rounded-lg space-y-3">
          <p>
            The Toolbox is a collection of useful tools for developers, it works
            locally mostly, no data will be uploaded to any server unless
            otherwise noted.
          </p>
          <p className="">
            I'll keep adding tools to the site, Check out the GitHub repo{" "}
            <a
              href="https://github.com/uvacoder/abc-tooling"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </div>
## Development

```bash
pnpm i
pnpm dev
```

## TODO

- [x] Extract the raw data from a QR Code
- [ ]  

## License

GPL-3.0
