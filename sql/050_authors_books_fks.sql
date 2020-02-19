USE [GraphqlBookstore]
GO

ALTER TABLE [dbo].[books]  WITH CHECK ADD  CONSTRAINT [FK_books_authors] FOREIGN KEY([authorId])
REFERENCES [dbo].[authors] ([id])
GO

ALTER TABLE [dbo].[books] CHECK CONSTRAINT [FK_books_authors]
GO