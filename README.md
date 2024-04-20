# Hosting
supabase url:  https://api.bestell-fair.de
release branch ist: release
work on main. merge locally to main, then pullrequest to release

gh pr erstenne: `gh pr create --base release --title "pull request" --body "erbitte review" --assignee @me`

# Admin
Wenn man *@bestell-fair.de* als Email hat, ist man automatisch Admin.

# Wartung

Restaurant importieren mit Account erstellung und allem: http://localhost:3000/partner/verwalten/import


yarn && yarn dev

# build
yarn build
## teelgram token zum posten 
```sh
function send_links_via_telegram() {
# Ausführen des
gh pr create
Befehls und Speichern der Ausgabe
local output=$(gh pr create --base release —title "pull request" --body "erbitte review" --assignee najajan-de --assignee leubeem)
# Extrahieren von URLs aus der Ausgabe
local urls=$(echo "$output" | grep -o 'http[s]\?://\S*')
# Nachricht zusammenstellen
local message="Links aus Pull Request: \n$urls"
# Telegram API URL
local url="https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage"
# URL-kodierte Nachricht senden
local
payload="chat_id=$TELEGRAM_CHAT_ID&text=$(echo $message | sed 's/ /%20/g' )&parse_mode=Markdown"
# Sendet die Nachricht mit curl
curl -s -X POST $url --data
"$payload"
}
# Setze den Token und die Chat-ID
export TELEGRAM_BOT_TOKEN= 'insert here'
export TELEGRAM_CHAT _ID='insert here'
# Funktion verwenden
# alias pr="gh pr create --base release --title \"pull request\" --body \"erbitte review\"
alias pr="send_links_via_telegram"
--assignee najajan-de --assignee leubeem"
```
