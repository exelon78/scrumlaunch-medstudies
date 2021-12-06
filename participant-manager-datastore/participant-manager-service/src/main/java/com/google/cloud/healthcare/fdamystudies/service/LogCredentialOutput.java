/*
 * Copyright 2020-2021 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

package com.google.cloud.healthcare.fdamystudies.service;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Component;


@Component
@Setter
@Getter
public class LogCredentialOutput {

    @Value("${user.details.link}") private String userDetailsLink;
    @Value("${bucket.name}") private String bucketName;
    @Value("${org.name}") private String orgName;
    @Value("${spring.datasource.url}") private String springDatasourceUrl;
    @Value("${spring.datasource.username}") private String springDatasourceUsername;
    @Value("${spring.datasource.password}") private String springDatasourcePassword;
    @Value("${spring.mail.host}") private String springMailHost;
    @Value("${spring.mail.username}") private String springMailUsername;
    @Value("${spring.mail.password}") private String springMailPassword;
    @Value("${mail.contact-email}") private String mailContactEmail;
    @Value("${mail.from-email}") private String mailFromEmail;
    @Value("${security.oauth2.client.client-id}") private String securityOauth2ClientClientId;
    @Value("${security.oauth2.client.client-secret}") private String securityOauth2ClientClientSecret;
    @Value("${security.oauth2.introspection_endpoint}") private String securityOauth2IntrospectionEndpoint;
    @Value("${security.oauth2.token_endpoint}") private String securityOauth2TokenEndpoint;
    @Value("${security.oauth2.client.redirect-uri}") private String securityOauth2ClientRedirectUri;
    @Value("${auth.server.register.url}") private String authServerRegisterUrl;
    @Value("${auth.server.updateStatusUrl}") private String authServerUpdateStatusUrl;
    @Value("${auth.server.logout.user.url}") private String authServerLogoutUserUrl;
    @Value("${study.builder.cloud.bucket.name}") private String studyBuilderCloudBucketName;


  public string credentialPrint() {
    return
    "\n______________________________________________________________" +
    "\n# Enable/Disable components from common-service"+
    "\nuser.details.link = ${PARTICIPANT_MANAGER_URL}/#/set-up-account/ = "+ userDetailsLink+

    "\n\n # cloud storage bucket name"+
    "\nbucket.name=${GCP_BUCKET_NAME} = "+bucketName+
    "\norg.name=${ORG_NAME} = "+orgName+

    "\n\n ## Spring DATASOURCE (DataSourceAutoConfiguration & DataSourceProperties)"+
    "\n\n# Refer Refer https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-configuration-properties.html"+
    "\nspring.datasource.url=jdbc:mysql://${DB_INSTANCE_URL}:3306/${DB_NAME} = "+ springDatasourceUrl+
    "\nspring.datasource.username=${DB_USER} = "+ springDatasourceUsername+
    "\nspring.datasource.password=${DB_PASS} = "+springDatasourcePassword+

    "\n\n# mail smtp configs"+
    "\nspring.mail.host=${SMTP_HOSTNAME} = "+springMailHost+
    "\nspring.mail.username=${MAIL_USERNAME} = "+springMailUsername+
    "\nspring.mail.password=${MAIL_PASSWORD} = "+springMailPassword+
    "\n# 587 for smtp protocol with starttls"+
    "\nspring.mail.port=587"+

    "\n\n# Email configs"+
    "\nmail.contact-email=${MAIL_CONTACT_EMAIL} = "+mailContactEmail+
    "\nmail.from-email=${MAIL_FROM_EMAIL} = "+mailFromEmail+

    "\n\n# Attach xsrf token to responses"+
    "\nsecurity.oauth2.client.client-id=${CLIENT_ID} = "+securityOauth2ClientClientId+
    "\nsecurity.oauth2.client.client-secret=${SECRET_KEY} = "+securityOauth2ClientClientSecret+
    "\nsecurity.oauth2.introspection_endpoint=${HYDRA_ADMIN_URL}/oauth2/introspect = "+securityOauth2IntrospectionEndpoint+
    "\nsecurity.oauth2.token_endpoint=${SCIM_AUTH_URL}/oauth2/token = "+securityOauth2TokenEndpoint+
    "\nsecurity.oauth2.client.redirect-uri=${SCIM_AUTH_URL}/login = "+securityOauth2ClientRedirectUri+
    "\nauth.server.register.url=${SCIM_AUTH_URL}/users = "+authServerRegisterUrl+
    "\nauth.server.updateStatusUrl=${SCIM_AUTH_URL}/users/{userId} = "+authServerUpdateStatusUrl+
    "\nauth.server.logout.user.url=${SCIM_AUTH_URL}/users/{userId}/logout = "+authServerLogoutUserUrll+
    "\nstudy.builder.cloud.bucket.name=${STUDY_BUILDER_GCP_BUCKET_NAME} = "+studyBuilderCloudBucketName+
    "\n______________________________________________________________";
  }
}
