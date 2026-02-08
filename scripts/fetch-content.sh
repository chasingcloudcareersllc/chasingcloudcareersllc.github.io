#!/bin/bash

# Fetch blog content
BLOG_DIR="content/blog"
BLOG_REPO="https://github.com/chasingcloudcareersllc/chasingcloudcareersllc-blog.git"

echo "Fetching blog content..."
rm -rf "$BLOG_DIR"
mkdir -p content
git clone "$BLOG_REPO" "$BLOG_DIR"

# Fetch learn content
LEARN_DIR="content/learn"
LEARN_REPO="https://github.com/chasingcloudcareersllc/chasingcloudcareersllc-learn.git"

echo "Fetching learn content..."
rm -rf "$LEARN_DIR"
git clone "$LEARN_REPO" "$LEARN_DIR"
