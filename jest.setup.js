import axios from "axios";

axios.defaults.adapter = require("axios/lib/adapters/http");
axios.defaults.baseURL = "http://localhost/";
