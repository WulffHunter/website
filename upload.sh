# Clean out the existing `dist` folder
ssh jaredrand.ca -t rm -i -f -- website/dist/*
# Upload the documents in the current `dist` folder
scp -r dist jaredrand.ca:website