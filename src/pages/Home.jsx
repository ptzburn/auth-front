import React from 'react'

const Home = ({ userData, user }) => {
  return (
    <>
      {user ? (
        <>
          <div className="home">Welcome, {userData ? userData.firstName : 'Developer'}!</div>
        </>
      ) : (
        <div className="home">Please sign in to proceed</div>
      )}
    </>
  )
}
export default Home
