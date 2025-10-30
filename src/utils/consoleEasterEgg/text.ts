/**
 * Console easter egg - static text content.
 *
 * Contains ASCII art and shared types used by section printers.
 */

/**
 * A collection of small ASCII-art options to greet curious DevTools visitors.
 *
 * Note: Each entry is rendered with monospace font and padded to a uniform width
 * at render time for clean backgrounds.
 */
export const ASCII_ARTS: string[] = [
	[
		'            __                  ',
		'          <(o )___              ',
		'           ( ._> /              ',
		"            `---'               ",
		'                                ',
		'  Welcome, curious developer!   ',
	].join('\n'),
	[
		'		                                                                                                    ',
		'                                                                                                    ',
		'                                                                                                    ',
		'                                                   x$;.                                             ',
		'                                                   :X&&X.                                           ',
		'                                                   .X&&&&&:                                         ',
		'                                                    ;&&&&&&&.       .                               ',
		'                                                    ;&&&&&&&&&.    :X.                              ',
		'                                               .$&X:;$&&&&&&&&&.   ;&X.                             ',
		'                                   .+X$&&&&&&&$$$&&&&&&&&&&&&&&x  .$&&;                             ',
		'                              :X$&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&$  ;&&&$.                            ',
		'                             .+$&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&..X&&&&;                            ',
		'                                 .;X&&&&&&&&&&&&&&&&&&&&&&&&&&&&;;&&&&X:                            ',
		'                                    .;$&&&&&&&&&&&&&&&&&&&&&&&&&X&&&&&X.                            ',
		'                                       :$&&&&&&&&&&&&&&&&&&&&&&&&&&&&&+.                            ',
		'                                         +&&&&&&&&&&&&&&&&&&&&&&&&&&&X;                             ',
		'                              .;++++xx++++X&&X:+&&&&&&&&&&&&&&&&&&&&&x.                             ',
		'                         :;x$&&&&&&&&&&&&&&$;..;X&&&&&&&&&&&&&&&&&&&X.                              ',
		'                           ;xX&&&&&&&&&&&&X:..:+&&&&&&&&&&&&&&&&&&&&&x                              ',
		'                               :X&&&&&&&X:. ..X&&&&&&&&&&&&&&&$&&&&&&&+                             ',
		'                                  ;$$&X;..;.+&&&&&&+X&&&&&$+:;;&&&&&&&&;                            ',
		'                                  .;;::..:.X&&&&&&&&&&&$;..: .;&&&&&&&&+.                           ',
		'                                .::..;:. .x&&&&&x:.+&$;.  : .:$&&&&&&&&&&&&X:     ..                ',
		'                               ;;:;:...+.:&x;;&&+. ......:.+Xx&&&&X&&&&&&&&&&&&&X.                  ',
		'                             .;;;+;;:..;+;:;;+;;;.         : X;:.+$&&&&&&X;:      .:;               ',
		'                             ;;;:.. ;;:;:+xx++;..   ;X:   .    :;&&x.x&&&&&&&$:                     ',
		'                           .;;;:.   :.   : .;+;..;;;;:.  .x   ..:;;::+&&&&&&&&&&&X.                 ',
		'                         :x;;;:..  .   .    .;;...::.;+:...:+.. :;;.;&&&&&&&&&&&&&&&X:              ',
		'                       :$&&$+;:. ..  .       :;:..:+xX;  ..    :x;;x&&&&+::::::;;;;;xXx:            ',
		'                     ;$&&&&&&&Xx+;.          ;;;:..;++xxX;.   :::+$&&&&&&X:                         ',
		'                   :$&&&&&&&&&&&X.     :x$X++;:.;:...:;:.   :.. .:;;;+;.::;.                        ',
		'                 .X&&&&&&&&&&&&&x:   ;X$X$+++;...;;:... ...  .                                      ',
		'                ;&&&&&&&&&&&&&&&$$$$$$$XXX;+;:.::.:;;::.   : ;XX:                                   ',
		'              .X&&&&&&&&&&&&&&$X$$$$$$$XXXx;:..:;..:.:.   ;. ;;xXx.                                 ',
		'             .+$&&&&&&&&&&&&&XXXXX$$$$$$$Xx;;:;;+;..:.   ;.;....;XX+...                             ',
		'           ;;;;;X&&&&&&&&&&$+xXXXXXXXX$$XXX+;:... .:::..:;:;:::.;XXXXXX;.                           ',
		'         .;;;;;..:X$&&&&&&X:.+XXXXXXXX$$X$XX;;;...    ;;.      .xXXXXXXXXXX;.                       ',
		'        :;;;;:.:;... .xX$X:..;XXXXXXXXX$X$XX+;;;...    :.       ;XXXXXXXXXXXXX:                     ',
		'       :;;;;:.;;;..     .  .:;XXX$XXXXXX$XXXX+;;:.:..  ..      .XXXXXXXXXXXXXX. .                   ',
		'      .+;;;..:;;:.      .   .+XXXXXXXXXXX$$X$Xx;;..  .:;;++:   ;XXXXXXXXXXXXXX:. .                  ',
		'      ;;;;...;;:.      .    :+XX$XXXXXXXXX$XX$XX;:.    .:.    .XXXXXXXXXXXXXX+ ;. .                 ',
		'     .+;;. .:;:.      :   .:+XXX$XX$$$XXXXX$$X$XX+..    ;:   .XXXXXXXXXXXXXXX;  : .                 ',
		'     .+;.  .::.      .  .;;;XXX$XX$XXXXXXXXXX$X$XXX;:.  ;: .:XXXXXXXX$$XXXXXX+.  .:.                ',
		'     .+. .....      :.:;;:+XXX$$X$$XX$X$XXXXX$$$X$XXXx;++;:xXXXXXXXXX$XXXXXXX+;. :. .               ',
		'     .;. ...      :;;;.: .x$XX$XX$XXXX$$X$$$XX$$$X$XXXXX+xX$$XXX$XXXX$XXXXXXx++; ;:  .              ',
		'      ;;       ......     ;$$X$XX$XXX$$XX$XX$XX$$$$$XXXXXXX$XXXXXXXXX$XXXXX+:    ;;. ..             ',
		'        .  .... ..         :$$$X$$XXXXX$$XX$$$XX$X$$$$$$$XXXXX$XXXXX$XXXXXx;.     .:.....           ',
		'                           :$$$$$XX$$XXX$XX$XX$$XXX$$$$XXXXX$XXXXXXXXXXXXX+:..      . .  .          ',
		'                           ;X$$$$$$$X$XXXX$XXX$X$$$$$XXXXX$XXXXXXXXXXXXXX+;;..       .    .         ',
		'                            ;XX$$$$$$X$XXXXX$$X$$$$XXXXX$XXXXXXXXXXXXXXXX+;;;..      ..    .        ',
		'                             +$XX$$$$$$$X$XXXX$$$XXXXX$$$$$$$XXXXXXXXX$X:.;;;;:.      .     .       ',
		'                             ;$$$XX$$XXX$X$$$$$XXXXXX$$$$XX$X$$XXXXX$$$x. .;;;;:.     .. .. .       ',
		'                            .+$$$$$$$XX$X$$$$XXXXX$$$$XX$XX$X$$$X$$X$$$X.   :;;;;::.:::.   ...      ',
		'                            .xXXX$$$$$$$$$$XXXXX$$$$$XX$$X$$XXX$XXX$$X;       ;x+..        ..       ',
		'                              .xX$$$$$$$$$$$$$&&&&&&&&&&&&&$$$$&&$$X+        +&&&&&&X.   .:.        ',
		'                                .X&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&$:       X&&&&&&&&&&X:..  ..      ',
		'                                 ;&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&X.    ;$&&&&&&&&&&&&$:   .;.     ',
		'                                 X&&$$$$$$$$$XXXXXXX$XXXXX$&&&&$&&&&x   x&&&&&&&&&&&&&&&X..;;.      ',
		'                                ;X$$$$$$XXXXXXXXXXXXXXXXX$&&&&$X$$$&$::$&&&&&&&&&&&&&&&&&x.         ',
		'                               ;X$X$$$$$$XXXXXXXXXXXXXXXX&&&&XXX$XX&&&$&&&&&&&&&&&&&&&&X.           ',
		'                              :X$$XX$$$XXXXXXXXXXXXXXXXX$&&&XXXXXXX&&&X+$&&&&&&&&&&&&;              ',
		'                             .X$$$$$$$$XXXXXXXXXXXXXXXXX&&&&XXXXXXX&&&$;.;&&&&&&&&$:                ',
		'                             .::::.::::................:;:::.....::::;;.  .;:::;;.                  ',
		'                                                                                                    ',
		'                                                                                                    ',
	].join('\n'),
]

/**
 * Return a random ASCII art from the available collection.
 */
export function getAsciiArt(): string {
	const idx = Math.floor(Math.random() * ASCII_ARTS.length)
	return ASCII_ARTS[idx]
}

/**
 * A collection of ASCII-art variations of the word "Hello!" for greeting.
 */
export const HELLO_ARTS: string[] = [
	[
		"('-. .-.   ('-.                                  ,---.",
		'( OO )  / _(  OO)                                 |   |',
		",--. ,--.(,------.,--.      ,--.      .-'),-----. |   |",
		"|  | |  | |  .---'|  |.-')  |  |.-') ( OO'  .-.  '|   |",
		'|   .|  | |  |    |  | OO ) |  | OO )/   |  | |  ||   |',
		"|       |(|  '--. |  |`-' | |  |`-' |\\_) |  |\\|  ||  .'",
		"|  .-.  | |  .--'(|  '---.'(|  '---.'  \\ |  | |  |`--' ",
		"|  | |  | |  `---.|      |  |      |    `'  '-'  '.--. ",
		"`--' `--' `------'`------'  `------'      `-----' '--' ",
	].join('\n'),
	[
		'      :::    ::: :::::::::: :::        :::        ::::::::  :::',
		'     :+:    :+: :+:        :+:        :+:       :+:    :+: :+: ',
		'    +:+    +:+ +:+        +:+        +:+       +:+    +:+ +:+  ',
		'   +#++:++#++ +#++:++#   +#+        +#+       +#+    +:+ +#+   ',
		'  +#+    +#+ +#+        +#+        +#+       +#+    +#+ +#+    ',
		' #+#    #+# #+#        #+#        #+#       #+#    #+#         ',
		'###    ### ########## ########## ########## ########  ###      ',
	].join('\n'),
	[
		'  _  _              _       _               _   ',
		' | || |    ___     | |     | |     ___     | |  ',
		' | __ |   / -_)    | |     | |    / _ \\    |_|  ',
		' |_||_|   \\___|   _|_|_   _|_|_   \\___/   _(_)_ ',
		'_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_| """ |',
		'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'',
	].join('\n'),
]

/**
 * Return a random "Hello!" ASCII art from the available collection.
 */
export function getHelloArt(): string {
	const idx = Math.floor(Math.random() * HELLO_ARTS.length)
	return HELLO_ARTS[idx]
}

/**
 * Section definition for the technology overview block.
 */
export type TechSection = {
	title: string
	items: string[]
}
