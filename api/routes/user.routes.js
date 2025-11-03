import express from 'express'
import { loginuser, logoutuser, registeruser } from '../controlller/user.controller.js'

export let userroutes= express.Router()

userroutes.route('/register').post(registeruser)
userroutes.route('/login').post(loginuser)
userroutes.route('/logout').post(logoutuser)