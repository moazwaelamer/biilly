import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Rooms } from "./pages/Rooms";
import { RoomDetails } from "./pages/RoomDetails";
import { Booking } from "./pages/Booking";
import { Games } from "./pages/Games";
import { MovieNights } from "./pages/MovieNights";
import { FoodDrinks } from "./pages/FoodDrinks";
import { Events } from "./pages/Events";
import { Location } from "./pages/Location";
import { Profile } from "./pages/Profile";
import { Layout } from "./components/Layout";
import { MovieDetails } from "./pages/MovieDetails";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { EventDetails } from "./pages/EventDetails";
import { PlayStationService } from "./pages/playstation";
import { BirthdayService } from "./pages/birthday";
import { AboutUsSection } from "./pages/aboutus";
import { VideoAdSection } from "./pages/Videoadvertisement";
import MovieBooking from "./pages/BookMovieBooking";
import { Leaderboard } from "./pages/Leaderboard";
export const router = createBrowserRouter([
{
path: "/",
Component: Layout,
children: [

{ index: true, Component: Home },

{ path: "rooms", Component: Rooms },

{ path: "rooms/:id", Component: RoomDetails },

{ path: "booking/:roomId", Component: Booking },

{ path: "games", Component: Games },
{ path: "movie-booking/:movieId", Component: MovieBooking },
{ path: "movie-nights", Component: MovieNights },

{ path: "movies/:id", Component: MovieDetails },

// في ملف router.ts (أو المكان اللي فيه createBrowserRouter)
{ path: "food", Component: FoodDrinks }, // غيرتها من food-drinks لـ food

{ path: "playstation", Component: PlayStationService },

{ path: "birthday", Component: BirthdayService },

{ path: "events", Component: Events },

{ path: "event/:id", Component: EventDetails },


{ path: "leaderboard", Component: Leaderboard },
{ path: "location", Component: Location },

{ path: "about", Component: AboutUsSection },

{ path: "video-ad", Component: VideoAdSection },

/* AUTH */

{ path: "login", Component: Login },

{ path: "register", Component: Register },

{ path: "profile", Component: Profile },

],
},
]);