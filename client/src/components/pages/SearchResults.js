import React from 'react';

const searchResults = props => {

    console.log(props)

    const searchTerm = props.location.state.searchTerm

    console.log(searchTerm)

    return (
        <div>
            These are the search results
        </div>
    )
}

export default searchResults