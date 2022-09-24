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
