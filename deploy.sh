echo "Iniciando despliegue"
#git pull

CID=$(docker ps -aqf "name=innova-pacs-web-server-c1")
echo $CID

echo "Detendiendo contenedor"
docker stop $CID

echo "Borrando contenedor"
docker rm $CID

echo "Borrando imagen"
docker rmi innova-pacs-web-server-c1:v1
docker build -t innova-pacs-web-server-c1:v1 .
docker run -p 4210:4200 --network dcm4chee_default --name innova-pacs-web-server-c1 -d innova-pacs-web-server-c1:v1

echo "Terminando despliegue"
