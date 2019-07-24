Environment="${DEPLOY_ENV:-prod}"

if [ $Environment = "prod" ]
then
    echo "Building in production mode:"
    npm run build
    echo "Launching in production mode:"
    npm run prod
else
    echo "Launching in development mode."
    npm run dev
fi