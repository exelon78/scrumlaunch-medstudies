/*
 * Copyright 2020 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

package com.google.cloud.healthcare.fdamystudies.dao;

import com.google.cloud.healthcare.fdamystudies.repository.UserAppDetailsRepository;
import com.google.cloud.healthcare.fdamystudies.usermgmt.model.UserAppDetailsBO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserAppDetailsDaoImpl implements UserAppDetailsDao {

  private static final Logger logger = LoggerFactory.getLogger(UserAppDetailsDaoImpl.class);
  @Autowired private UserAppDetailsRepository userAppDetailsRepository;

  @Override
  public UserAppDetailsBO save(UserAppDetailsBO userAppDetails) {
    logger.info("UserAppDetailsDaoImpl loadEmailCodeByUserId() - starts");
    if (userAppDetails != null) {

      UserAppDetailsBO dbResponse = userAppDetailsRepository.save(userAppDetails);
      logger.info("UserAppDetailsDaoImpl loadEmailCodeByUserId() - ends");
      return dbResponse;
    }
    return null;
  }
}
