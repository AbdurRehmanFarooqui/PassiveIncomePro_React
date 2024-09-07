import React from 'react'

import { useLocation } from 'react-router-dom';
const AboutUs = () => {
    const location = useLocation();

    return (
        <>
            <main className='about-us privacy-policy for-add'>
                <div className='add'></div>
                <div>
                    <div className="container2">
                        <h2>{location.pathname === '/privacypolicy' ? 'Privacy Policy for Passive Income Pro' : 'Terms and Conditions for Passive Income Pro'}</h2>
                        {/* {location.pathname === '/privacypolicy' ? <h4 className='effective-date'>Effective Date: [Insert Date]</h4> : <></>} */}
                    </div>

                    {location.pathname === '/privacypolicy' ? <div className="container2 detail">
                        <div>
                            <h4>1. Introduction </h4>

                            <p>Welcome to Passive Income Pro ("we," "us," "our"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website, use our services, or interact with us.</p>

                            <h4>2. Information We Collect</h4>

                            <p>We collect various types of information to provide and improve our services, including:<br /><br />
                                <b>Personal Information:</b> This includes your name, email address, phone number, and payment information when you register, make a purchase, or interact with us. <br /><br />
                                <b>Usage Data:</b> Information about your interactions with our website and services, including IP addresses, browser types, pages visited, and time spent on our site.<br /><br />
                                <b>Cookies and Tracking Technologies:</b> We use cookies and similar technologies to track user activity and preferences.
                            </p>

                            <h4>3. How We Use Your Information</h4>

                            <p>We use your information for the following purposes:
                                <br /><br />
                                <b>To Provide and Improve Our Services: </b> This includes processing transactions, managing accounts, and enhancing user experience.
                                <br /><br />
                                <b>To Communicate With You: </b> Sending updates, newsletters, and promotional materials (you can opt-out at any time).
                                <br /><br />
                                <b>To Analyze and Understand Usage: </b> To analyze trends, monitor site performance, and personalize content.
                                <br /><br />
                                <b>To Ensure Security:</b>Detecting, preventing, and addressing technical issues and fraud.</p>

                            <h4>4. How We Share Your Information</h4>

                            <p>We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:<br /><br />
                                <b>With Service Providers:</b> We may share your data with third-party vendors who perform services on our behalf, such as payment processors and email service providers.<br /><br />
                                <b>For Legal Reasons: </b>We may disclose your information to comply with legal obligations, enforce our policies, or protect our rights, property, or safety.<br /><br />
                                <b>Business Transfers:</b> In the event of a merger, acquisition, or other business transaction, your information may be transferred as part of the deal.
                            </p>

                            <h4>5. Data Security</h4>

                            <p>We implement industry-standard security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>


                            <h4>6. Your Rights and Choices</h4>

                            <p>You have certain rights regarding your personal information, including:<br /><br />
                                <b>Access and Correction:</b> You may request access to or correction of your personal information.<br /><br />
                                <b>Opt-Out:</b> You can opt out of receiving marketing communications by following the unsubscribe instructions in those communications.<br /><br />
                                <b>Data Deletion:</b> You may request the deletion of your personal information, subject to certain legal exceptions.
                            </p>


                            <h4>7. Children's Privacy</h4>

                            <p>Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware of any such data, we will take steps to delete it.</p>


                            <h4>8. Changes to This Privacy Policy</h4>

                            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.</p>


                            <h4>9. Contact Us</h4>

                            <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at: <span style={{ color: "#007bff" }}> passiveincomepro@gmail.com</span></p>
                            <br />

                        </div>
                    </div>
                        :
                        <div className="container2 detail">
                            <div>
                                <h4>1. Introduction </h4>

                                <p>Welcome to Passive Income Pro. By accessing or using our services, you agree to the following terms and conditions. Please review them carefully.</p>

                                <h4>2. Packages and Pricing</h4>

                                <p>We offer the following packages:
                                    <br /><br />
                                    <strong>Package 1: Free Account</strong>
                                    <br />

                                    <b>Features:</b> Access to basic tools, limited usage.
                                    <br />

                                    <b>Cost:</b> Free of charge.
                                    <br />

                                    <b>Payout:</b> PKR 109,900, subject to terms outlined below.

                                    <br /><br />
                                    <strong>Package 2: Basic Registration</strong>
                                    <br />
                                    For Pakistan Registration: 99 PKR
                                    <br />
                                    For International Registration: 1 USD
                                    <br />
                                    <b>Features:</b> Additional tools, expanded access.
                                    <br />

                                    <b>Payout:</b> PKR 40,000, subject to terms outlined below.

                                    <br /><br />
                                    <strong>Package 3: Premium Registration</strong>
                                    <br />

                                    For Pakistan Registration: 199 PKR
                                    <br />
                                    For International Registration: 2 USD
                                    <br />
                                    <b>Features:</b> All features from Package 2 plus extra benefits, priority support.
                                    <br />

                                    <b>Payout:</b> PKR 20,000, subject to terms outlined below.
                                </p>

                                <h4>3. Payment Terms</h4>

                                <p>Payments for Package 2 and Package 3 must be made in full at the time of registration.
                                    Accepted payment method is Bank Transfer.
                                    <br />
                                    <br />
                                    All payments are non-refundable, except as required by law.
                                </p>

                                <h4>4. Payout Conditions </h4>

                                <p>
                                    <b>Package 1:</b> Payouts of PKR 109,900 are available as per the terms outlined below.<br /><br />
                                    <b>Package 2:  </b>Payouts of PKR 40,000 are available as per the terms outlined below.<br /><br />
                                    <b>Package 3: </b> Payouts of PKR 20,000 are available as per the terms outlined below.<br /><br />
                                    <b>Update Requirement:</b> You must update your account to the latest package level with a minimum balance of PKR 50,000 before any payout can be processed.<br /><br />
                                    <b>Test Requirement:</b><br />
                                    Candidates for Package 1 and Package 2 are required to pass a test before any payout is processed.<br />
                                    Candidates for Package 3 are not required to take any test.

                                </p>

                                <h4>5. Account Registration and Security</h4>

                                <p>To register for any package, you must provide accurate and complete information. <br /><br />
                                    You are responsible for maintaining the confidentiality of your account information, including your username and password. <br /> <br />
                                    Notify us immediately of any unauthorized use of your account.
                                </p>


                                <h4>6. Service Access</h4>

                                <p>Access to the features and benefits of each package is granted upon successful payment and registration.<br /><br />
                                    We reserve the right to modify, suspend, or discontinue any package or feature at our sole discretion.
                                </p>


                                <h4>7. Termination and Cancellation</h4>

                                <p>You may cancel your account at any time by contacting our support team at <span style={{ color: "#007bff" }}> passiveincomepro@gmail.com</span>. <br /><br />
                                    Upon cancellation, access to paid features will remain available until the end of the current billing cycle.
                                </p>


                                <h4>8. Changes to Terms</h4>

                                <p>We may update these terms and conditions periodically. Any changes will be communicated via email / website, and continued use of the service constitutes acceptance of the new terms.</p>


                                <h4>9. Limitation of Liability</h4>

                                <p>Passive Income Pro is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services. Our liability is limited to the extent permitted by law.</p>



                                <h4>10. Contact Us</h4>

                                <p>For questions or concerns regarding these terms and conditions, please contact us at:<span style={{ color: "#007bff" }}> passiveincomepro@gmail.com</span></p>
                                <br />

                            </div>
                        </div>
                    }
                </div>
                <div className='add'></div>
            </main >
        </>
    )
}

export default AboutUs