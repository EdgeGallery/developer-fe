# Copyright 2021 Huawei Technologies Co., Ltd.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM swr.cn-north-4.myhuaweicloud.com/edgegallery/website-gateway
ENV APP_HOME /usr/app

ENV USER_NAME=eguser
ENV GROUP_NAME=eggroup

# Set the working directory.
WORKDIR /usr/app

RUN mkdir -p -m 750 /usr/app/configs/ &&\
    mkdir -p -m 750 /usr/app/configs/static/ &&\
    chown -R eguser:eggroup /usr/app/configs/

COPY --chown=eguser:eggroup dist/ /usr/app/configs/static/