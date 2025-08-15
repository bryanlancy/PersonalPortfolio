/*
	Animation timeline

	Animation:
    Smug emoji face "walks" into view
    Packages sliding past scanner
    Scanner scans package and info is added to table as item is scanned
    Graph changes as items are added

	Transition:
    Convery belt speeds up and graph breaks out of its container
    Graph bars continue to grow off screen, bars "wrap around" to other side and wipe across screen
    Emoji face get scared/nervous as bars bury him on panel
    Bars clear revealing a woozy emoji face

*/

const Chapter3 = () => {
	const title = 'Finding the Limits'
	const text = `built a barcode-scanning \
                spreadsheet used to manage millions in inventory. Eventually, \
                I hit the limits of what spreadsheets could do.`
	return (
		<div>
			<h1>{title}</h1>
			<p>{text}</p>
		</div>
	)
}

export default Chapter3
