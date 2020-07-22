/*
 * Copyright 2020 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

package com.google.cloud.healthcare.fdamystudies.common;

public final class CommonConstants {
  private CommonConstants() {}

  public static final String USER_ID_HEADER = "userId";

  public static final String YES = "Y";

  public static final String NO = "N";

  public static final Integer ACTIVE_STATUS = 1;
  
  public static final int INACTIVE_STATUS = 0;

  public static final String OPEN_STUDY = "OPEN";

  public static final String CLOSE_STUDY = "CLOSE";

  public static final Integer READ_PERMISSION = 1;

  public static final Integer READ_AND_EDIT_PERMISSION = 2;

  public static final int VIEW_VALUE = 0;

  public static final int EDIT_VALUE = 1;

}
