package io.starter.csat.model.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CsatCsatExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    public CsatCsatExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Long value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Long value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Long value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Long value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Long value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Long value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Long> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Long> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Long value1, Long value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Long value1, Long value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNull() {
            addCriterion("user_id is null");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNotNull() {
            addCriterion("user_id is not null");
            return (Criteria) this;
        }

        public Criteria andUserIdEqualTo(Long value) {
            addCriterion("user_id =", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotEqualTo(Long value) {
            addCriterion("user_id <>", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThan(Long value) {
            addCriterion("user_id >", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThanOrEqualTo(Long value) {
            addCriterion("user_id >=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThan(Long value) {
            addCriterion("user_id <", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThanOrEqualTo(Long value) {
            addCriterion("user_id <=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdIn(List<Long> values) {
            addCriterion("user_id in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotIn(List<Long> values) {
            addCriterion("user_id not in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdBetween(Long value1, Long value2) {
            addCriterion("user_id between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotBetween(Long value1, Long value2) {
            addCriterion("user_id not between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andAtlasIdIsNull() {
            addCriterion("atlas_id is null");
            return (Criteria) this;
        }

        public Criteria andAtlasIdIsNotNull() {
            addCriterion("atlas_id is not null");
            return (Criteria) this;
        }

        public Criteria andAtlasIdEqualTo(Long value) {
            addCriterion("atlas_id =", value, "atlasId");
            return (Criteria) this;
        }

        public Criteria andAtlasIdNotEqualTo(Long value) {
            addCriterion("atlas_id <>", value, "atlasId");
            return (Criteria) this;
        }

        public Criteria andAtlasIdGreaterThan(Long value) {
            addCriterion("atlas_id >", value, "atlasId");
            return (Criteria) this;
        }

        public Criteria andAtlasIdGreaterThanOrEqualTo(Long value) {
            addCriterion("atlas_id >=", value, "atlasId");
            return (Criteria) this;
        }

        public Criteria andAtlasIdLessThan(Long value) {
            addCriterion("atlas_id <", value, "atlasId");
            return (Criteria) this;
        }

        public Criteria andAtlasIdLessThanOrEqualTo(Long value) {
            addCriterion("atlas_id <=", value, "atlasId");
            return (Criteria) this;
        }

        public Criteria andAtlasIdIn(List<Long> values) {
            addCriterion("atlas_id in", values, "atlasId");
            return (Criteria) this;
        }

        public Criteria andAtlasIdNotIn(List<Long> values) {
            addCriterion("atlas_id not in", values, "atlasId");
            return (Criteria) this;
        }

        public Criteria andAtlasIdBetween(Long value1, Long value2) {
            addCriterion("atlas_id between", value1, value2, "atlasId");
            return (Criteria) this;
        }

        public Criteria andAtlasIdNotBetween(Long value1, Long value2) {
            addCriterion("atlas_id not between", value1, value2, "atlasId");
            return (Criteria) this;
        }

        public Criteria andRatingIsNull() {
            addCriterion("rating is null");
            return (Criteria) this;
        }

        public Criteria andRatingIsNotNull() {
            addCriterion("rating is not null");
            return (Criteria) this;
        }

        public Criteria andRatingEqualTo(Long value) {
            addCriterion("rating =", value, "rating");
            return (Criteria) this;
        }

        public Criteria andRatingNotEqualTo(Long value) {
            addCriterion("rating <>", value, "rating");
            return (Criteria) this;
        }

        public Criteria andRatingGreaterThan(Long value) {
            addCriterion("rating >", value, "rating");
            return (Criteria) this;
        }

        public Criteria andRatingGreaterThanOrEqualTo(Long value) {
            addCriterion("rating >=", value, "rating");
            return (Criteria) this;
        }

        public Criteria andRatingLessThan(Long value) {
            addCriterion("rating <", value, "rating");
            return (Criteria) this;
        }

        public Criteria andRatingLessThanOrEqualTo(Long value) {
            addCriterion("rating <=", value, "rating");
            return (Criteria) this;
        }

        public Criteria andRatingIn(List<Long> values) {
            addCriterion("rating in", values, "rating");
            return (Criteria) this;
        }

        public Criteria andRatingNotIn(List<Long> values) {
            addCriterion("rating not in", values, "rating");
            return (Criteria) this;
        }

        public Criteria andRatingBetween(Long value1, Long value2) {
            addCriterion("rating between", value1, value2, "rating");
            return (Criteria) this;
        }

        public Criteria andRatingNotBetween(Long value1, Long value2) {
            addCriterion("rating not between", value1, value2, "rating");
            return (Criteria) this;
        }

        public Criteria andKeyVersionIsNull() {
            addCriterion("key_version is null");
            return (Criteria) this;
        }

        public Criteria andKeyVersionIsNotNull() {
            addCriterion("key_version is not null");
            return (Criteria) this;
        }

        public Criteria andKeyVersionEqualTo(Long value) {
            addCriterion("key_version =", value, "keyVersion");
            return (Criteria) this;
        }

        public Criteria andKeyVersionNotEqualTo(Long value) {
            addCriterion("key_version <>", value, "keyVersion");
            return (Criteria) this;
        }

        public Criteria andKeyVersionGreaterThan(Long value) {
            addCriterion("key_version >", value, "keyVersion");
            return (Criteria) this;
        }

        public Criteria andKeyVersionGreaterThanOrEqualTo(Long value) {
            addCriterion("key_version >=", value, "keyVersion");
            return (Criteria) this;
        }

        public Criteria andKeyVersionLessThan(Long value) {
            addCriterion("key_version <", value, "keyVersion");
            return (Criteria) this;
        }

        public Criteria andKeyVersionLessThanOrEqualTo(Long value) {
            addCriterion("key_version <=", value, "keyVersion");
            return (Criteria) this;
        }

        public Criteria andKeyVersionIn(List<Long> values) {
            addCriterion("key_version in", values, "keyVersion");
            return (Criteria) this;
        }

        public Criteria andKeyVersionNotIn(List<Long> values) {
            addCriterion("key_version not in", values, "keyVersion");
            return (Criteria) this;
        }

        public Criteria andKeyVersionBetween(Long value1, Long value2) {
            addCriterion("key_version between", value1, value2, "keyVersion");
            return (Criteria) this;
        }

        public Criteria andKeyVersionNotBetween(Long value1, Long value2) {
            addCriterion("key_version not between", value1, value2, "keyVersion");
            return (Criteria) this;
        }

        public Criteria andKeySpecIsNull() {
            addCriterion("key_spec is null");
            return (Criteria) this;
        }

        public Criteria andKeySpecIsNotNull() {
            addCriterion("key_spec is not null");
            return (Criteria) this;
        }

        public Criteria andKeySpecEqualTo(String value) {
            addCriterion("key_spec =", value, "keySpec");
            return (Criteria) this;
        }

        public Criteria andKeySpecNotEqualTo(String value) {
            addCriterion("key_spec <>", value, "keySpec");
            return (Criteria) this;
        }

        public Criteria andKeySpecGreaterThan(String value) {
            addCriterion("key_spec >", value, "keySpec");
            return (Criteria) this;
        }

        public Criteria andKeySpecGreaterThanOrEqualTo(String value) {
            addCriterion("key_spec >=", value, "keySpec");
            return (Criteria) this;
        }

        public Criteria andKeySpecLessThan(String value) {
            addCriterion("key_spec <", value, "keySpec");
            return (Criteria) this;
        }

        public Criteria andKeySpecLessThanOrEqualTo(String value) {
            addCriterion("key_spec <=", value, "keySpec");
            return (Criteria) this;
        }

        public Criteria andKeySpecLike(String value) {
            addCriterion("key_spec like", value, "keySpec");
            return (Criteria) this;
        }

        public Criteria andKeySpecNotLike(String value) {
            addCriterion("key_spec not like", value, "keySpec");
            return (Criteria) this;
        }

        public Criteria andKeySpecIn(List<String> values) {
            addCriterion("key_spec in", values, "keySpec");
            return (Criteria) this;
        }

        public Criteria andKeySpecNotIn(List<String> values) {
            addCriterion("key_spec not in", values, "keySpec");
            return (Criteria) this;
        }

        public Criteria andKeySpecBetween(String value1, String value2) {
            addCriterion("key_spec between", value1, value2, "keySpec");
            return (Criteria) this;
        }

        public Criteria andKeySpecNotBetween(String value1, String value2) {
            addCriterion("key_spec not between", value1, value2, "keySpec");
            return (Criteria) this;
        }

        public Criteria andOwnerIdIsNull() {
            addCriterion("owner_id is null");
            return (Criteria) this;
        }

        public Criteria andOwnerIdIsNotNull() {
            addCriterion("owner_id is not null");
            return (Criteria) this;
        }

        public Criteria andOwnerIdEqualTo(Long value) {
            addCriterion("owner_id =", value, "ownerId");
            return (Criteria) this;
        }

        public Criteria andOwnerIdNotEqualTo(Long value) {
            addCriterion("owner_id <>", value, "ownerId");
            return (Criteria) this;
        }

        public Criteria andOwnerIdGreaterThan(Long value) {
            addCriterion("owner_id >", value, "ownerId");
            return (Criteria) this;
        }

        public Criteria andOwnerIdGreaterThanOrEqualTo(Long value) {
            addCriterion("owner_id >=", value, "ownerId");
            return (Criteria) this;
        }

        public Criteria andOwnerIdLessThan(Long value) {
            addCriterion("owner_id <", value, "ownerId");
            return (Criteria) this;
        }

        public Criteria andOwnerIdLessThanOrEqualTo(Long value) {
            addCriterion("owner_id <=", value, "ownerId");
            return (Criteria) this;
        }

        public Criteria andOwnerIdIn(List<Long> values) {
            addCriterion("owner_id in", values, "ownerId");
            return (Criteria) this;
        }

        public Criteria andOwnerIdNotIn(List<Long> values) {
            addCriterion("owner_id not in", values, "ownerId");
            return (Criteria) this;
        }

        public Criteria andOwnerIdBetween(Long value1, Long value2) {
            addCriterion("owner_id between", value1, value2, "ownerId");
            return (Criteria) this;
        }

        public Criteria andOwnerIdNotBetween(Long value1, Long value2) {
            addCriterion("owner_id not between", value1, value2, "ownerId");
            return (Criteria) this;
        }

        public Criteria andCreatedDateIsNull() {
            addCriterion("created_date is null");
            return (Criteria) this;
        }

        public Criteria andCreatedDateIsNotNull() {
            addCriterion("created_date is not null");
            return (Criteria) this;
        }

        public Criteria andCreatedDateEqualTo(Date value) {
            addCriterion("created_date =", value, "createdDate");
            return (Criteria) this;
        }

        public Criteria andCreatedDateNotEqualTo(Date value) {
            addCriterion("created_date <>", value, "createdDate");
            return (Criteria) this;
        }

        public Criteria andCreatedDateGreaterThan(Date value) {
            addCriterion("created_date >", value, "createdDate");
            return (Criteria) this;
        }

        public Criteria andCreatedDateGreaterThanOrEqualTo(Date value) {
            addCriterion("created_date >=", value, "createdDate");
            return (Criteria) this;
        }

        public Criteria andCreatedDateLessThan(Date value) {
            addCriterion("created_date <", value, "createdDate");
            return (Criteria) this;
        }

        public Criteria andCreatedDateLessThanOrEqualTo(Date value) {
            addCriterion("created_date <=", value, "createdDate");
            return (Criteria) this;
        }

        public Criteria andCreatedDateIn(List<Date> values) {
            addCriterion("created_date in", values, "createdDate");
            return (Criteria) this;
        }

        public Criteria andCreatedDateNotIn(List<Date> values) {
            addCriterion("created_date not in", values, "createdDate");
            return (Criteria) this;
        }

        public Criteria andCreatedDateBetween(Date value1, Date value2) {
            addCriterion("created_date between", value1, value2, "createdDate");
            return (Criteria) this;
        }

        public Criteria andCreatedDateNotBetween(Date value1, Date value2) {
            addCriterion("created_date not between", value1, value2, "createdDate");
            return (Criteria) this;
        }

        public Criteria andModifiedDateIsNull() {
            addCriterion("modified_date is null");
            return (Criteria) this;
        }

        public Criteria andModifiedDateIsNotNull() {
            addCriterion("modified_date is not null");
            return (Criteria) this;
        }

        public Criteria andModifiedDateEqualTo(Date value) {
            addCriterion("modified_date =", value, "modifiedDate");
            return (Criteria) this;
        }

        public Criteria andModifiedDateNotEqualTo(Date value) {
            addCriterion("modified_date <>", value, "modifiedDate");
            return (Criteria) this;
        }

        public Criteria andModifiedDateGreaterThan(Date value) {
            addCriterion("modified_date >", value, "modifiedDate");
            return (Criteria) this;
        }

        public Criteria andModifiedDateGreaterThanOrEqualTo(Date value) {
            addCriterion("modified_date >=", value, "modifiedDate");
            return (Criteria) this;
        }

        public Criteria andModifiedDateLessThan(Date value) {
            addCriterion("modified_date <", value, "modifiedDate");
            return (Criteria) this;
        }

        public Criteria andModifiedDateLessThanOrEqualTo(Date value) {
            addCriterion("modified_date <=", value, "modifiedDate");
            return (Criteria) this;
        }

        public Criteria andModifiedDateIn(List<Date> values) {
            addCriterion("modified_date in", values, "modifiedDate");
            return (Criteria) this;
        }

        public Criteria andModifiedDateNotIn(List<Date> values) {
            addCriterion("modified_date not in", values, "modifiedDate");
            return (Criteria) this;
        }

        public Criteria andModifiedDateBetween(Date value1, Date value2) {
            addCriterion("modified_date between", value1, value2, "modifiedDate");
            return (Criteria) this;
        }

        public Criteria andModifiedDateNotBetween(Date value1, Date value2) {
            addCriterion("modified_date not between", value1, value2, "modifiedDate");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table csat$_csat
     *
     * @mbggenerated do_not_delete_during_merge Fri Feb 01 20:43:57 PST 2019
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table csat$_csat
     *
     * @mbggenerated Fri Feb 01 20:43:57 PST 2019
     */
    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}