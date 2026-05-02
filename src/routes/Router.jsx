import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Work from "../pages/Work/Work";
import VoiceAndSupport from "../pages/VoiceAndSupport/VoiceAndSupport";
import Services from "../pages/Services/Services";
import Blog from "../pages/Blog/Blog";
import BlogPost from "../pages/Blog/BlogPost";
import Support from "../pages/Support/Support";
import FAQs from "../pages/FAQs/FAQs";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService/TermsOfService";
import Careers from "../pages/Careers/Careers";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Mainlayout></Mainlayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/about',
                element: <About></About>,
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/work',
                element: <Work></Work>,
            }, 
            {
                path: '/voiceAndSupport',
                element: <VoiceAndSupport></VoiceAndSupport>
            },
            {
                path: '/services',
                element: <Services></Services>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/blog/:id',
                element: <BlogPost></BlogPost>
            },
            {
                path: '/support',
                element: <Support></Support>
            },
            {
                path: '/faqs',
                element: <FAQs></FAQs>,
            },
            {
                path: '/privacyPolicy',
                element: <PrivacyPolicy></PrivacyPolicy>,
            },
            {
                path: '/termsOfService',
                element: <TermsOfService></TermsOfService>,
            },
            {
                path: '/careers',
                element: <Careers></Careers>
            }
        ]
    }
])