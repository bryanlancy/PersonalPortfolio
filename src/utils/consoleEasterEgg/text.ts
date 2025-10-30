import { interpolateColors } from '../styles'

type AsciiLines = string[]
interface AsciiArt {
	lines: string[]
	color?: string | string[]
}

const DUCK_LINES: AsciiLines = [
	'            __                  ',
	'          <(o )___              ',
	'           ( ._> /              ',
	"            `---'               ",
	'                                ',
	'  Welcome, curious developer!   ',
]

const GOKU_LINES: AsciiLines = [
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
]
const SONIC_LINES: AsciiLines = [
	'	                                                                                                 ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                    .:+$$$$$$$$$X;:                                 ',
	'                                               .+X$$X$$X$$$$X$X$X$X$$$x;                            ',
	'                                             ;$$XX$X$X$$$$$$X$X$X$X$X$X$$$;.                        ',
	'                                           +$$X$X$X$$$$x;;$$X$X$X$X$X$X$X$X$X.                      ',
	'                                   $$$$x+;$$X$X$X$$$X;::::$$$X$X$X$X$$$Xx+++++:                     ',
	'                                   +$X$X$$$X$X$X$$$X$X$x:+$$X$X$$$$$;                               ',
	'                                   :X$X$$X$X$X$$$$$$$$$$$$$$$X$X$$$$X+.                             ',
	'                                    ;$$$$$X$X$$$$$X$$X$$X$$X$X$X$XX$X$$x.                           ',
	'                                    :$$$$X$$$$XX;   :$$$$X$X$X$X$$X$X$$$$+                          ',
	'                                ;;++;$X$$X$X$$X       $$$X$X$X$X$X$X$X$X$$X.                        ',
	'                         :X+X;.;   :;:;$X$X$$+   $+   X$X$X$X$X$X$X$X$X$X$XX.                       ',
	'                       :x++:  +: .+: .++$$XXX.   Xx:  $$$$X$X$X$X$X$X$X$X$X$+                       ',
	'                      +::.  +::; ;:   ;;+$$$.    ;&;.$$$X$$X$X$$$$$X$X$X$X$X$;                      ',
	'                     :;  .:+.xx: ;: .$$X;;X;.     :+;:::X$X$X$XX$$$$$XXX$XX$XX.                     ',
	'                     :+++;::+x:  ++. .x$XX:::;x;;+::++::+$$$X$X$$X$: ;x$$X$X$X:                     ',
	'                     :;   ;$. .++;.X    :+:::::::;x;:::$$$X$X$X$X$$$.   .X$XX$;                     ',
	'                      ;;;++:  .+;.+::     .;xx+;;;++XX$$$$$X$X$X$X$X+     :X$$;                     ',
	'                        .X++xX:  ;+;:    :+:::+$$X$:::;X;::X$$X$X$XXx       +$:                     ',
	'                           .;+;   +;;xX+;x:::::;XX$$$Xx:::;+.+$X$X$Xx        .                      ',
	'                             .+xx++::::;x:::::::XX$$$$XxX;::$  X$$X$+                               ',
	'                                     :  ;;:::::;XX.$+.+$:::+    x$$Xx                               ',
	'                                         x:::::+.  :;. :+;++     +$$;                               ',
	'                                          +;::XX.   ;. .:::+     .X$                                ',
	'                                           +$$$X.    :++;+:       .                                 ',
	'                                            x$X&X    .;X$;                                          ',
	'                                            :$$XX$;..+&:+:                                          ',
	'                                             +$$:+$$x:++X:                                          ',
	'                                             ;X$$.XX$;                                              ',
	'                                           :+;$X$Xx$$$:                                             ',
	'                                          ;: :+++;+X$$X+;;+:                                        ',
	'                                          .+;XX  X :X$&&X: ;                                        ',
	'                                          ;:.:.  .x;;   .;;;+                                       ',
	'                                     :+X;. ..:x+:;;::    .::+:                                      ',
	'                                  ;XXXXXXX+.   .XX$XX+xX$x;:::+x+                                   ',
	'                                ;XXXXXXXXXXX.   .$$XXXX+       .;++                                 ',
	'                               +XXXXXXXXXXXX$    $$XXX;    .XXXXXX$X.                               ',
	'                               +XXXXXXXXXXXX$;+;;+xxXx    +XXXXXXXXXX+                              ',
	'                                ;x;:;;;;;:;+xx;:   +;X:  ;XXXXXXXXXXXXx                             ',
	'                                                    .;+;+XXXXXXXXXXXXXX:                            ',
	'                                                       .+;+xXXXXXXXXXXX:                            ',
	'                                                            :+XX+++xX;                              ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
]
const BURGER_LINES: AsciiLines = [
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                        :;;;+;;;++++++++++++;;;.                                    ',
	'                                 :;;+++;+++++++++++++++;+++++++++++;;.                              ',
	'                            .;;;+++++;;++;+;;;;;;;;;;+++;+;+++++++++++++;:                          ',
	'                         :;;;;;+;;;;;;;;;;;;;;;;;;;;;;;+;;;;;+++++++++++++++;:                      ',
	'                      :;+;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;+;;;;;;;;;;+;++++++++++;;.                   ',
	'                    :;;;;;;;;;;;;;;;;;;;;:;;:;;;;;;;;;;+:;;;;;;;;;;;;;;+;++;+++++;;                 ',
	'                  ;;;;;;;;;;;:::::::::::;::;:::;;::;;;;+;:;:::;::;;;;;;;;;+;;;;+;;;+;               ',
	'                 ;;;;;;;;::::::::::::::::;:::::;;:::;;:;::::::;:::::::::;;;;;;;;;;;;;.              ',
	'                ;;;;;::::::::::::::::::::::::::::::::::::....:..::..::::::;;;;;;;;;;;;              ',
	'               :;;::::::::....::::::::::.:..::::::::.:::. ............:::::::::;++++;::             ',
	'              :;;::::::::::...:::::;;;;;;;;;;;::;:::;::::;;;;;;;;;+;;:::;:::;;++x;+xXX+;:           ',
	'           .:;+;:+++:::;;;;;+;+++++xXXXx;::::;;:::::;;;;;++;+++x$X+;$X$$xX$++xxXX+;+$X++;;:.        ',
	'            :XX::xXXxXXXXX+::++;. :;::;;:::;;x;.. .+x+xXX$;;;;++;;;;+;+&&XXxxxxX$X+;+Xx+++++;.:.    ',
	'      ;.   :xXXX::+xX$xxX$+;;::..:;+x;X&+;;++++;:;;++XX&&&XxX&&&&&X;$$$$XXXx$$$$$x++;+XX+++:+;;.    ',
	'      ;xXXXXx++X+..:+xX&X++;;;:::&$$x$X$$X+;;+x;::;xx$&&&$X$&&&&&xX$X+++x+:+x$$$XX+;;:$X+;:;x+:     ',
	'    .;xX$x+X++xXX$+;+++x&&&&&+;;:$&&X+x$&&&&&$x;;;+;X&&&&&xxxx+;+XX$$$$$Xx;+x+$$XxXX++XXx;++        ',
	' :;;;:;+x++++Xx;:;XX+;:;+xXXXXXXX+x;:$+;;+$xx&&&$$$xx&$++X;;;::+X::;xXXXXXXXXXXXxx++;;$X+XXx;       ',
	'  .:;:::;;;;+XXXXXXX+:. .:;+xXXXXXXXXXXX+X$X+XXXXx+;:Xx:++.     ..:;XXXXXXXXXXXXXXX++:::;+:+;:      ',
	'     :;;;;;;XXX+++xXXX+:::;+XXXXXXXXXXXXXX$+X$$x+;::..::;+:... ::;;+XXXXXXXXXXXXXXx+;:::;+:+;       ',
	'          ;xXXX+;++x+++..::::. .:::::::::;;:;++;....:;;:::::::::;+xxxxXXXXXXXXXXXX+;;:::;x:+:       ',
	'          :;;:;;;:::... ..:;+x+++++XxXxX+++;;:::...........::::::::::::;;;;;;;;;;+XXX+$XX+:         ',
	'         ....   .....:;+;;++X$$X++x$X;;XXXXX+::.   .........::::::::::::::::::;+$&$X$X$&$X;;        ',
	'        ...   .....:+++X$x++++;;xxX++xxXx+X$X+;::::...::::::::..::::::::::::::X&$$&$X++$$X+$;       ',
	'        ........::++++++X$x++;::+;:;+XX$$&&&$$Xx+++++++XX++;::...:::::::::.:;xX$$$XXx++xx++$+       ',
	'         :..:::::+xxxx++XX+++;;+x+xxX$&$$X+;+X&&&&&$+XXX$&$$$;:::::::::::::;xXX&&&Xx++XX++X;;       ',
	'         .+X+++Xx+xxXxXXX$$xx+xXXXXX$$$$x++:x$&$XXxxXXXX$$$$$&&X;:::::::;xXX$&&&&&$X$$&$XXXx        ',
	'          ;+xXxXX$$$$$&&$$$$X$$$$$&&&&&&&&$&&&&&&$$$$&&&&&$$&$$Xx$&$$$$X&$X$$$$$X$XX$$XX++.         ',
	'            .::;++++++++++xx+Xx+X+++;;;;;;;:;;;+++;;;;;+;;;;;+++++++++++++++;;++;;;:::;:::;:        ',
	'           ...::::::;;;;;;;;;;;;;;;;;:;;;;;;;;++++++++++++;+++++xx+xxx++++++++++;;;;;;;;:;+:;       ',
	'          ..::::::;;;;;;;;;;;;;+;+++;;;;;++++++++++++++++++++x+xxxxxxxx+x++x++++++;+++;;;+;;;       ',
	'           ::::;;;;;;;;;;;;+;;++;;+;++++++++++++++++++++++x+xxxxxxx+++++++x++++++++++++++;;+.       ',
	'           .::;;;;;;;;;+;+++++++++++++++++++++++++++++++++x++xxxx+xx+++++++++++++++++++++++;        ',
	'            :;;;;;;+++++++++++++++++++++++++++++++++++++++xx+xx+x+x+x++++++++++++++++++++++:        ',
	'             .;;+++++++++++++++x++++++++++++++++++++++++x+++++++++++++++++x++++x++++++x+x+:         ',
	'                :;+xXXXXXXx+++++++++++++++++++++++++++++++++++++++++++x+xX+xXxxXXX$$$$XX+;:.        ',
	'                                      ....::::::::;;;;;;;;;;;;;;;;;:::::::....                      ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
	'                                                                                                    ',
]

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
export const ASCII_ARTS: AsciiArt[] = [
	{
		lines: DUCK_LINES,
		color: interpolateColors('#e3d800', '#e36a00', DUCK_LINES.length),
	},
	{
		lines: GOKU_LINES,
		color: interpolateColors('#183c6c', '#e36a00', GOKU_LINES.length),
	},
	{
		lines: SONIC_LINES,
		color: interpolateColors('#104797', '#e20b15', SONIC_LINES.length),
	},
	{
		lines: BURGER_LINES,
		color: interpolateColors('#e98d09', '#b44900', BURGER_LINES.length),
	},
]

/**
 * Return a random ASCII art from the available collection.
 */
export function getAsciiArt(): AsciiArt {
	const idx = Math.floor(Math.random() * ASCII_ARTS.length)
	return ASCII_ARTS[idx]
}

// HELLO ARTS
const HELLO1_LINES: AsciiLines = [
	"('-. .-.   ('-.                                  ,---.",
	'( OO )  / _(  OO)                                 |   |',
	",--. ,--.(,------.,--.      ,--.      .-'),-----. |   |",
	"|  | |  | |  .---'|  |.-')  |  |.-') ( OO'  .-.  '|   |",
	'|   .|  | |  |    |  | OO ) |  | OO )/   |  | |  ||   |',
	"|       |(|  '--. |  |`-' | |  |`-' |\\_) |  |\\|  ||  .'",
	"|  .-.  | |  .--'(|  '---.'(|  '---.'  \\ |  | |  |`--' ",
	"`--' `--' `------'`------'  `------'      `-----' '--' ",
]

const HELLO2_LINES: AsciiLines = [
	'      :::    ::: :::::::::: :::        :::        ::::::::  :::',
	'     :+:    :+: :+:        :+:        :+:       :+:    :+: :+: ',
	'    +:+    +:+ +:+        +:+        +:+       +:+    +:+ +:+  ',
	'   +#++:++#++ +#++:++#   +#+        +#+       +#+    +:+ +#+   ',
	'  +#+    +#+ +#+        +#+        +#+       +#+    +#+ +#+    ',
	' #+#    #+# #+#        #+#        #+#       #+#    #+#         ',
	'###    ### ########## ########## ########## ########  ###      ',
]

const HELLO3_LINES: AsciiLines = [
	'  _  _              _       _               _   ',
	' | || |    ___     | |     | |     ___     | |  ',
	' | __ |   / -_)    | |     | |    / _ \\    |_|  ',
	' |_||_|   \\___|   _|_|_   _|_|_   \\___/   _(_)_ ',
	'_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_| """ |',
	'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'',
]

/**
 * A collection of ASCII-art variations of the word "Hello!" for greeting.
 */
export const HELLO_ARTS: AsciiArt[] = [
	{
		lines: HELLO1_LINES,
		color: interpolateColors('#5bdede', '#2dc298', HELLO1_LINES.length),
	},
	{
		lines: HELLO2_LINES,
		color: interpolateColors('#c9a022', '#b00c0c', HELLO2_LINES.length),
	},
	{
		lines: HELLO3_LINES,
		color: interpolateColors('#2239c9', '#c22d2d', HELLO3_LINES.length),
	},
]

/**
 * Return a random "Hello!" ASCII art from the available collection.
 */
export function getHelloArt(): AsciiArt {
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
