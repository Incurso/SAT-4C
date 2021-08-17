## (Optional) Install as a linux service
To install as as SystemD service do the following, example assumes SAT:4C was installed into /opt

### Create service user
```
sudo useradd -r sat4c
```

### Grant service user ownership of sat4c directory
```
sudo chown -R sat4c:sat4c /opt/sat4c
```

### Grant permission for user/group of sat4c directory
sudo chmod -R u+rwX,go+rwX,o-w /opt/sat4c/

### Make index.js of sat4c server executable
sudo chmod ug+x /opt/sat4c/server/index.js

### Copy service file to SystemD
```
sudo cp /opt/sat4c/config/sat4c.service.example /etc/systemd/system/sat4c.service
sudo systemctl enable sat4c
sudo systemctl start sat4c
```
