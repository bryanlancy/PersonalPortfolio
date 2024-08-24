import React from 'react'

export default function Icons({ icons }) {
    return (
        Object.values(icons).map((icon, i) => (
            <React.Fragment key={`icon${i}`}>{icon}</React.Fragment>
        ))
    )
}
