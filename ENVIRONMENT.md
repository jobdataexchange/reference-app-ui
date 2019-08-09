# Deployment Environment Configuration

The steps described in this section provides a guide on how to configure the environment needed to run this application.

## AWS S3 Configuration

Create a S3 bucket (e.g. `site-staging.example.com`)
Apply the following S3 Bucket Policy to the bucket (Note: Be sure to look up the correct ARN for the bucket):

```json
{
    "Version": "2012-10-17",
    "Id": "CFREAD",
    "Statement": [
        {
            "Sid": "AllowCFRead",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::bucket.name",
                "arn:aws:s3:::bucket.name/*"
            ]
        }
    ]
}
```

Follow the steps in [README](README.md) for deployment instructions.

## AWS CloudFront Configuration

- Go to the AWS CloudFront service page and create a new distribution.
- Choose **Web** as the delivery method.
- In the **Origin Domain Name** field, select the name of the S3 bucket created in the previous step.
- Under **Default Cache Behavior Settings** select **Redirect HTTP to HTTPS** in the **Viewer Protocol Policy** field.
- Set **Default Root Object** to index.html
Wait a few minutes for the distribution to initialize (This may be a good time to set up DNS hostname with CloudFlare).
Once this instance is set up, it should now be possible to view the application via the CloudFront URL shown in the control panel.

To configure a custom domain name with CloudFlare see the sections below.

## Setting up DNS Routing with CloudFlare

Note that this step is only needed for configuring a custom domain name.

- Log in to CloudFlare and select the domain of interest where the application will be hosted.
- Copy the domain name from CloudFront and create a new CNAME record.
- Enter the name that will be prepended to the URL
(e.g `staging` will create a subdomain `staging.example.com`).
- Paste the CloudFront domain name in the Domain Name field.
- Set **Proxy Status** to **DNS only** by clicking on the cloud icon.

## Setting up HTTPS with AWS Certificate Manager

In order to get the benefits of HTTPS, a SSL certificate must be created.

- Navigate to AWS Certificate Manager and click on the **Request a certificate** button.
- Select **Request a public certificate**.
- In the **Domain Name** field, specify the complete domain name for the subdomain created in CloudFlare (e.g. `staging.example.com`).
- Press the **Next** button and select **DNS validation**.
- Press the **Confirm and Request** button.
- Return to CloudFlare and create the CNAME record as shown in the instructions. Wait a few minutes for the SSL certificate to be issued.

## Applying the SSL Certificate to CloudFront

Once the SSL certificate has been issued, return to the CloudFront distribution and click on the identifier for the distribution under configuration.

- In the **General** tab, click the **Edit** button to modify the settings.
- In the **Alternate Domain Names (CNAMEs)** field, enter the name of the subdomain created in CloudFlare (e.g. `staging.example.com`).
- Select **Custom SSL Certificate** and choose the one created for the subdomain.
- Press the **Yes, Edit** button.

## Setting up HTTP Error Redirects

Because the application is a Single Page Application (SPA), in order for it to function properly, all errors (e.g. 403 and 404) must be redirected to
index.html. To do this:

- Select the CloudFront distribution under configuration and navigate to the **Error Pages** tab.
- Create two custom error responses that redirect to /index.html, one for HTTP status 403 and another for HTTP status 404. Be sure to set the error caching
minimum TTL to 0 and the HTTP response code to 200.

Finally, navigate to the URL (e.g. `https://staging.example.com`) to confirm that the configuration was successful.
