# build a static website, it should be placed in `./out` directory
npm run build

# create Vercel Build Output directory
mkdir -p .vercel/output/static

# move assets to Vercel Build Output directory
mv out/* .vercel/output/static/

# create config file
echo '{ "version": 3 }' > .vercel/output/config.json