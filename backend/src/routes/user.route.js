import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers,getMyFriends,sendFriendRequest,acceptFriendRequest,getFriendRequests,getOutgoingFriendReqs} from "../controllers/user.controller.js";
const router = express.Router();

//apply auth middleware to all routes
router.use(protectRoute);
//recommended users route
router.get("/",getRecommendedUsers);
//my friends 
router.get("/friends",getMyFriends);
//send friend request
router.post("/friend-request/:id",sendFriendRequest);
//accept friend request
router.put("/friend-request/:id",acceptFriendRequest);
//get all friend request
router.get('/friend-requests',getFriendRequests);
//
router.get('/outgoing-friend-request',getOutgoingFriendReqs)

export default router;