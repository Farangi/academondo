mongoimport --db altruvation-backend-dev --collection fieldofinterests --drop --file ./server/seeds/fieldofinterest-seed.json





mongoimport -h ds061246.mlab.com:61246 -d altruvation-backend-prod -c fieldofinterests -u TmLD4es1CK5b -p EKeasFAHTJe2 --file fieldofinterest-seed.json
mongoimport -h ds061246.mlab.com:61246 -d altruvation-backend-prod -c techniques -u TmLD4es1CK5b -p EKeasFAHTJe2 --file technique-seed.json
mongoimport -h ds061246.mlab.com:61246 -d altruvation-backend-prod -c countries -u TmLD4es1CK5b -p EKeasFAHTJe2 --file countries-seed.json