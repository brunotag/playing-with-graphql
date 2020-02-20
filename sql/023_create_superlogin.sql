USE [master]
GO

/* For security reasons the login is created disabled and with a random password. */
/****** Object:  Login [GraphqlBookstoreUser]    Script Date: 19/02/2020 4:39:40 PM ******/
CREATE LOGIN [GraphqlBookstoreSuperUser] WITH PASSWORD=N'vlX/iXzQw1TraPYDIjUhK4fDOJJ2i0Mv7KXtv6cozdM=', DEFAULT_DATABASE=[master], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO