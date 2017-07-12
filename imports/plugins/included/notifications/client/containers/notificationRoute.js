import { withProps } from "recompose";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { composeWithTracker } from "/lib/api/compose";
import { Meteor } from "meteor/meteor";
import { Notifications } from "/lib/collections";
import { NotificationRoute } from "../components";

const actions = {
  markAllAsRead(notificationList) {
    notificationList.map((notify) => {
      Meteor.call("notification/markOneAsRead", notify._id);
    });
  },
  markOneAsRead(id) {
    Meteor.call("notification/markOneAsRead", id);
  }
};

function composer(props, onData) {
  if (Meteor.subscribe("Notification", Meteor.userId()).ready()) {
    const notificationList = Notifications.find({}, { sort: { timeSent: -1 } }).fetch();
    const unread = Notifications.find({ status: "unread" }).count();

    onData(null, {
      notificationList,
      unread
    });
  }
}

registerComponent("NotificationRoute", NotificationRoute, [
  composeWithTracker(composer),
  withProps(actions)
]);

export default composeWithTracker(composer)(NotificationRoute);