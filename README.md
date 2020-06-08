# Port test CLI

See blog post: https://blog.adamhancock.co.uk/portx/

# Linux One Liner

```
sudo wget -q `curl -s https://api.github.com/repos/adamhancock/portx/releases/latest | jq -r '.assets[] | select(.name == "portx-linux") |.browser_download_url'` -O /tmp/portx && chmod +x /tmp/portx && mv /tmp/portx /usr/local/bin/portx

```

[![Build Status](https://drone.a9k.io/api/badges/adamhancock/portx/status.svg)]
