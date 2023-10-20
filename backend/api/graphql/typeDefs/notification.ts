import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Query {
    getAllNotifications: GetAllNotificationsReturnType
  }

  type Notification {
    id: String
    senderId: String
    type: String
    read: Boolean
    createdAt: Date
  }

  type Mutation {
    createNotification(
      recipientId: String
      type: String
    ): CreateNotificationReturnType
  }

  type CreateNotificationReturnType {
    success: Boolean
  }

  type GetAllNotificationsReturnType {
    notifications: [Notification]
  }

  type Subscription {
    notificationCreated: Notification
  }
`;

export default typeDefs;
