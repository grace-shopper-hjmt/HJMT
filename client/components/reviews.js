import React from 'react'

export const Review = props => {
    console.log('review component props: ', props)
    const review = props.reviewContent
    return (
        <div>
            <h4>Rating: {review.rating}</h4>
            <h2>{review.content}</h2>
        </div>
    )
}
