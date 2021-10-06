import React from 'react'

export default function Text({ value, color, timer }) {




    function textChange() {
        const outline = document.querySelector('.outline__line')
        outline.classList.remove('outline__animation')
    }

    return (
        <svg className="outline" viewBox="0 0 250 50">
            <symbol id="outline__text">
                <text textAnchor="start" dominantBaseline="hanging" x="0" y="5">
                    {value}.
                </text>
            </symbol>
            <g>
                <use
                    xlinkHref="#outline__text"
                    style={{ stroke: color, animationDuration: `${(timer - 1000) / 1000}s` }}
                    className="outline__line outline__animation"
                    onAnimationEnd={() => textChange()}
                ></use>
            </g>
        </svg>
    )
}
