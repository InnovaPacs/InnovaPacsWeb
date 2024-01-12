echo "Iniciando despliegue"
#git pull

CID=$(docker ps -aqf "name=innova-pacs-web-demo-server")
echo $CID

echo "Detendiendo contenedor"
docker stop $CID

echo "Borrando contenedor"
docker rm $CID

echo "Borrando imagen"
docker rmi innova-pacs-web-demo-server:v1
docker build -t innova-pacs-web-demo-server:v1 .
docker run -p 4210:4200 --network dcm4chee --name innova-pacs-web-demo-server -d innova-pacs-web-demo-server:v1

echo "Terminando despliegue"
