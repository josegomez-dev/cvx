#!/bin/bash

# Script to help get Vercel credentials for GitHub Actions
# Run this script from your project root after linking with Vercel

set -e

echo "🚀 CVx Portfolio - Vercel Credentials Helper"
echo "=============================================="
echo ""

# Check if .vercel directory exists
if [ ! -d ".vercel" ]; then
    echo "❌ .vercel directory not found!"
    echo ""
    echo "Please run the following commands first:"
    echo "  1. npm install -g vercel"
    echo "  2. vercel login"
    echo "  3. vercel link"
    echo ""
    exit 1
fi

# Check if project.json exists
if [ ! -f ".vercel/project.json" ]; then
    echo "❌ .vercel/project.json not found!"
    echo ""
    echo "Please run: vercel link"
    echo ""
    exit 1
fi

echo "✅ Found Vercel configuration"
echo ""

# Extract IDs from project.json
PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId": "[^"]*' | grep -o '[^"]*$')
ORG_ID=$(cat .vercel/project.json | grep -o '"orgId": "[^"]*' | grep -o '[^"]*$')

echo "📋 Your Vercel Credentials:"
echo "=============================================="
echo ""
echo "VERCEL_PROJECT_ID:"
echo "$PROJECT_ID"
echo ""
echo "VERCEL_ORG_ID:"
echo "$ORG_ID"
echo ""
echo "=============================================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Get your VERCEL_TOKEN:"
echo "   → Visit: https://vercel.com/account/tokens"
echo "   → Create a new token"
echo "   → Copy the token (you won't see it again!)"
echo ""
echo "2. Add these secrets to GitHub:"
echo "   → Go to: Your Repo → Settings → Secrets and variables → Actions"
echo "   → Click 'New repository secret'"
echo "   → Add each secret:"
echo ""
echo "   Secret Name: VERCEL_TOKEN"
echo "   Secret Value: [Your token from step 1]"
echo ""
echo "   Secret Name: VERCEL_PROJECT_ID"
echo "   Secret Value: $PROJECT_ID"
echo ""
echo "   Secret Name: VERCEL_ORG_ID"
echo "   Secret Value: $ORG_ID"
echo ""
echo "3. (Optional) Add environment variables:"
echo "   → NEXT_PUBLIC_SITE_URL"
echo "   → NEXT_PUBLIC_SPOTIFY_URL"
echo "   → Any other env vars your app needs"
echo ""
echo "✅ Once secrets are added, push to main to trigger deployment!"
echo ""


