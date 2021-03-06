#!/bin/bash

# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -ex

MODULES=(
  devops
  audit
  scrumlaunch2-dev-secrets
  scrumlaunch2-dev-networks
  scrumlaunch2-dev-apps
  scrumlaunch2-dev-firebase
  scrumlaunch2-dev-data
)

ACTIONS=()
ROOT="."

while getopts "a:d:" c
do
  case $c in
    a) ACTIONS+=("${OPTARG}") ;;
    d) ROOT="${OPTARG}" ;;
    *)
      echo "Invalid flag ${OPTARG}"
      exit 1
      ;;
  esac
done

ROOT=$(realpath "${ROOT}")

for mod in "${MODULES[@]}"
do
    cd "${ROOT}"/"${mod}"
    terraform init
    for action in "${ACTIONS[@]}"
    do
      # Convert action string to array as it can have multiple arguments.
      IFS=' ' read -r -a args <<< "${action}"
      terraform "${args[@]}"
    done
done
