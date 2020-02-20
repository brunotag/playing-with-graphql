USE [GraphqlBookstore]
GO

/****** Object:  User [GraphqlBookstoreUser]    Script Date: 19/02/2020 4:41:18 PM ******/
CREATE USER [GraphqlBookstoreUser] FOR LOGIN [GraphqlBookstoreUser] WITH DEFAULT_SCHEMA=[dbo]
GO

ALTER ROLE [db_datareader] ADD MEMBER [GraphqlBookstoreUser]
GO

ALTER ROLE [db_datawriter] ADD MEMBER [GraphqlBookstoreUser]
GO
