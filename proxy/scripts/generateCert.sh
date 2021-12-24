openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 99999 -in csr.pem -signkey key.pem -out cert.pem 
rm csr.pem
mv key.pem ../key.pem
mv cert.pem ../cert.pem