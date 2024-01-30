import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UserPost from './UserPost';

const UserInfo = () => {
    return (
        // <div className="hero min-h-screen bg-base-200">
        //     <div className="hero-content flex-col lg:flex-row">
        //         <div className='w-[200px] border'>
        //         <img src="" className="max-w-sm rounded-lg shadow-2xl" alt='profile pic'/>
        //         </div>
        //         <div>
        //             <h1 className="text-5xl font-bold">Box Office News!</h1>
        //             <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        //             <button className="btn btn-primary">Get Started</button>
        //         </div>
        //     </div>
        // </div>

        <div className=' mx-10 my-6'>
            {/* <div className='border w-[200px] bg-white'>
                hello
            </div> */}
            <div className='border bg-white rounded p-4'>
                <Tabs>
                    <TabList>
                        <Tab>User Info</Tab>
                        <Tab>Post Details</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Any content 1</h2>
                    </TabPanel>
                    <TabPanel>
                        <UserPost></UserPost>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default UserInfo;