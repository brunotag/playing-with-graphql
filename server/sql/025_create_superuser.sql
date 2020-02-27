USE [GraphqlBookstore]
GO

/****** Object:  User [GraphqlBookstoreUser]    Script Date: 19/02/2020 4:41:18 PM ******/
CREATE USER [GraphqlBookstoreSuperUser] FOR LOGIN [GraphqlBookstoreSuperUser] WITH DEFAULT_SCHEMA=[dbo]
GO


ALTER ROLE [db_owner] ADD MEMBER [GraphqlBookstoreSuperUser]
GO