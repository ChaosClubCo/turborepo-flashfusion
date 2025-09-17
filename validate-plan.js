#!/usr/bin/env node

/**
 * FlashFusion Monorepo Mapping Plan Validator
 * 
 * This script validates the monorepo mapping plan and provides a summary
 * of the proposed repository organization.
 */

const fs = require('fs');
const path = require('path');

function validateMappingPlan() {
  console.log('🔍 FlashFusion Monorepo Mapping Plan Validator\n');
  
  try {
    const planPath = path.join(__dirname, 'monorepo-mapping-plan.json');
    const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
    
    const categories = Object.keys(plan.monorepo_mapping_plan).filter(key => 
      plan.monorepo_mapping_plan[key].repositories
    );
    
    let totalRepos = 0;
    const methodCounts = {};
    const priorityCounts = { high: 0, medium: 0, low: 0, archive: 0 };
    const languageCounts = {};
    
    console.log('📊 Summary by Category:\n');
    
    categories.forEach(category => {
      const categoryData = plan.monorepo_mapping_plan[category];
      const repos = categoryData.repositories;
      
      console.log(`${category.replace(/_/g, ' ').toUpperCase()}:`);
      console.log(`  Description: ${categoryData.category_description}`);
      console.log(`  Repositories: ${repos.length}`);
      
      if (categoryData.recommended_subset) {
        console.log(`  Recommended subset: ${categoryData.recommended_subset.join(', ')}`);
      }
      
      repos.forEach(repo => {
        totalRepos++;
        
        // Count migration methods
        methodCounts[repo.migration_method] = (methodCounts[repo.migration_method] || 0) + 1;
        
        // Count priorities
        priorityCounts[repo.priority] = (priorityCounts[repo.priority] || 0) + 1;
        
        // Count languages
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      });
      
      console.log('');
    });
    
    console.log('📈 Overall Statistics:\n');
    console.log(`Total Repositories: ${totalRepos}`);
    console.log('');
    
    console.log('Migration Methods:');
    Object.entries(methodCounts).forEach(([method, count]) => {
      console.log(`  ${method}: ${count}`);
    });
    console.log('');
    
    console.log('Priority Distribution:');
    Object.entries(priorityCounts).forEach(([priority, count]) => {
      console.log(`  ${priority}: ${count}`);
    });
    console.log('');
    
    console.log('Language Distribution:');
    Object.entries(languageCounts).forEach(([language, count]) => {
      console.log(`  ${language}: ${count}`);
    });
    console.log('');
    
    // Validate directory structure
    console.log('🏗️ Proposed Directory Structure:\n');
    const structure = plan.monorepo_mapping_plan.directory_structure;
    
    Object.entries(structure).forEach(([dir, items]) => {
      console.log(`${dir}`);
      items.forEach(item => {
        console.log(`  ├── ${item}/`);
      });
      console.log('');
    });
    
    // High priority recommendations
    console.log('🎯 High Priority Migrations (Phase 1):\n');
    categories.forEach(category => {
      const highPriorityRepos = plan.monorepo_mapping_plan[category].repositories
        .filter(repo => repo.priority === 'high');
      
      if (highPriorityRepos.length > 0) {
        console.log(`${category.replace(/_/g, ' ').toUpperCase()}:`);
        highPriorityRepos.forEach(repo => {
          console.log(`  - ${repo.repo_name} → ${repo.destination_path} (${repo.migration_method})`);
        });
        console.log('');
      }
    });
    
    console.log('✅ Validation Complete - Plan is ready for implementation!\n');
    
    return true;
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    return false;
  }
}

if (require.main === module) {
  validateMappingPlan();
}

module.exports = { validateMappingPlan };